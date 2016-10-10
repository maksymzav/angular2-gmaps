import {Component, OnInit, ElementRef, Renderer, Input, ViewChild, OnChanges, SimpleChanges} from '@angular/core';
import {AZApiMapsLoaderService} from "../../services/az-api-maps-loader";
import {AZApiMapsWrapperService} from "../../services/az-api-maps-wrapper";
import MapOptions = google.maps.MapOptions;
import MapTypeControlOptions = google.maps.MapTypeControlOptions;
import LatLng = google.maps.LatLng;
import LatLngLiteral = google.maps.LatLngLiteral;
import DirectionsRequest = google.maps.DirectionsRequest;
import {Observable} from "rxjs/Rx";
import {AZMapChildComponent} from "../../entities/AZMapChildComponent";
import {SimpleCoordinate} from "../../entities/SimpleCoordinatesList";
import DirectionsWaypoint = google.maps.DirectionsWaypoint;

const DEFAULT_ZOOM = 4;
const MAP_ELEMENT_ID = 'az-map-container';

@Component({
    selector: 'az-map',
    template: `<div id="#div">
    <ng-content></ng-content>
    </div>`
})
export class AZMapComponent extends AZMapChildComponent implements OnInit, OnChanges {

    public mapId: number;
    public center: LatLng | LatLngLiteral;

    public optionsAvailable() {
        return ['backgroundColor', 'center', 'disableDefaultUI', 'disableDoubleClickZoom', 'draggable', 'draggableCursor', 'draggingCursor', 'heading', 'keyboardShortcuts',
            'mapMaker', 'mapTypeControl', 'mapTypeControlOptions', 'mapTypeId', 'maxZoom', 'minZoom', 'noClear', 'overviewMapControl', 'overviewMapControlOptions',
            'panControl', 'panControlOptions', 'rotateControl', 'rotateControlOptions', 'scaleControl', 'scaleControlOptions', 'scrollwheel', 'streetView',
            'streetViewControl', 'streetViewControlOptions', 'styles', 'tilt', 'zoom', 'zoomControl', 'zoomControlOptions'];
    }

    @Input() public centerLat: number;
    @Input() public centerLng: number;

    @Input() public direction: Observable<DirectionsRequest>;

    @Input() public backgroundColor: string;
    @Input() public disableDefaultUI: boolean;
    @Input() public disableDoubleClickZoom: boolean;
    @Input() public draggable: boolean;
    @Input() public draggableCursor: string;
    @Input() public draggingCursor: string;
    @Input() public heading: number;
    @Input() public keyboardShortcuts: boolean;
    @Input() public mapMaker: boolean;
    @Input() public mapTypeControl: boolean;
    @Input() public mapTypeControlOptions: google.maps.MapTypeControlOptions;
    @Input() public mapTypeId: google.maps.MapTypeId;
    @Input() public maxZoom: number;
    @Input() public minZoom: number;
    @Input() public noClear: boolean;
    @Input() public overviewMapControl: boolean;
    @Input() public overviewMapControlOptions: google.maps.OverviewMapControlOptions;
    @Input() public panControl: boolean;
    @Input() public panControlOptions: google.maps.PanControlOptions;
    @Input() public rotateControl: boolean;
    @Input() public rotateControlOptions: google.maps.RotateControlOptions;
    @Input() public scaleControl: boolean;
    @Input() public scaleControlOptions: google.maps.ScaleControlOptions;
    @Input() public scrollwheel: boolean;
    @Input() public streetView: any;//StreetViewPanorama, cannot specified, because it is a class, not an interface, and it tries to find google namespace when it is not loaded.
    @Input() public streetViewControl: boolean;
    @Input() public streetViewControlOptions: google.maps.StreetViewControlOptions;
    @Input() public styles: google.maps.MapTypeStyle[];
    @Input() public tilt: number;
    @Input() public zoom: number;
    @Input() public zoomControl: boolean;
    @Input() public zoomControlOptions: google.maps.ZoomControlOptions;

    @ViewChild('div') container: HTMLBodyElement;

    private _lastBuiltDirection: Observable<DirectionsRequest>;
    private _lastDirectionDisplay: google.maps.DirectionsRenderer;

    constructor(protected _element: ElementRef, private _renderer: Renderer, private _wrapper: AZApiMapsWrapperService, private _loader: AZApiMapsLoaderService) {
        super();
    }


    ngOnInit() {
        this._loader.load().then(()=> {
            let mapElement = this._renderer.createElement(this._element.nativeElement, 'div');
            mapElement.id = MAP_ELEMENT_ID;
            this.mapId = this._wrapper.loadMap(mapElement, this.getMapOptions());
            this._element.nativeElement.setAttribute('map-id', this.mapId);
            this.buildDirection();
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        this._loader.load().then(()=> {
            if (this._lastBuiltDirection) {
                this.buildDirection();
            }
        });
    }

    buildDirection() {
        if (!this.direction || this._lastBuiltDirection === this.direction) {
            return;
        }
        this._lastBuiltDirection = this.direction;
        this.direction.subscribe((coordinates: SimpleCoordinate[]) => {
            if (coordinates.length < 2) {
                return;
            }
            let request = this._createDirectionRequest(coordinates);
            let directionsService = new google.maps.DirectionsService();
            let directionDisplay = new google.maps.DirectionsRenderer();
            this._removeLastDirection();
            this._lastDirectionDisplay = directionDisplay;
            directionDisplay.setMap(this._wrapper.getNativeMap(this.mapId));
            directionsService.route(request, function (result, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionDisplay.setDirections(result);
                }
            });
        });
    }

    getMapOptions() {
        this._checkMapOptionsValidity();
        return this.getComponentOptions();
    }

    private _checkMapOptionsValidity() {
        if (!this.centerLat) {
            throw Error('The center longitude of the map must be specified, using az-map-center-lat property on az-map component.');
        }
        if (!this.centerLng) {
            throw Error('The center latitude of the map must be specified, using az-map-center-lng property on az-map component.');
        }
        this.zoom = this.zoom || DEFAULT_ZOOM;

        this.center = {
            lat: this.centerLat,
            lng: this.centerLng
        };
    }

    protected _createDirectionRequest(coordinates: SimpleCoordinate[]): DirectionsRequest {
        let request: DirectionsRequest = {
            origin: coordinates.shift(),
            destination: coordinates.pop(),
            travelMode: google.maps.TravelMode.DRIVING,
            optimizeWaypoints: true
        };
        if (coordinates.length) {
            request.waypoints = this._generateWaypointsFromCoordinates(coordinates);
        }
        return request;
    }

    protected _generateWaypointsFromCoordinates(coordinates: SimpleCoordinate[]): DirectionsWaypoint[] {
        return coordinates.map((coord: SimpleCoordinate) => {
            return {
                location: new google.maps.LatLng(coord.lat, coord.lng),
                stopover: false
            }
        });
    }

    protected _removeLastDirection() {
        if (this._lastDirectionDisplay) {
            this._lastDirectionDisplay.setMap(null);
        }
    }


}