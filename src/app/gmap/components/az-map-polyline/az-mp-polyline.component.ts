import {Component, OnInit, ElementRef, Input} from '@angular/core';
import {AZApiMapsLoaderService} from "../../services/az-api-maps-loader";
import {AZApiMapsWrapperService} from "../../services/az-api-maps-wrapper";
import {AZMapChildComponent} from "../../entities/AZMapChildComponent";
var polyline = require('polyline');


@Component({
    selector: 'az-map-polyline',
    template: ''
})
export class AZMapPolylineComponent extends AZMapChildComponent implements OnInit {

    protected optionsAvailable() {
        return [
            'clickable',
            'draggable',
            'editable',
            'geodesic',
            'icons',
            'map',
            'path',
            'strokeColor',
            'strokeOpacity',
            'strokeWeight',
            'visible',
            'zIndex'
        ];
    }

    @Input() public clickable:boolean;
    @Input() public draggable:boolean;
    @Input() public editable:boolean;
    @Input() public geodesic:boolean;
    @Input() public icons:google.maps.IconSequence[];
    // @Input() public map:google.maps.Map;
    @Input() public path:google.maps.MVCArray|google.maps.LatLng[]|google.maps.LatLngLiteral[];
    @Input() public strokeColor:string;
    @Input() public strokeOpacity:number;
    @Input() public strokeWeight:number;
    @Input() public visible:boolean;
    @Input() public zIndex:number;
    @Input() public polylinePath: string;

    constructor(protected _element:ElementRef, private _loader:AZApiMapsLoaderService, private _wrapper:AZApiMapsWrapperService) {
        super();
    }

    ngOnInit() {
        this._loader.load().then(()=> {
            this._defineMapId();
            this._createPolyline();

        });
    }

    private _createPolyline() {
        if (this.polylinePath){
            this.path = polyline.decode(this.polylinePath).map((item:any) => Object.assign({lat: item[0], lng: item[1]}));
        }
        var flightPath = new google.maps.Polyline(this.getComponentOptions());
        flightPath.setMap(this._wrapper.getNativeMap(this.mapId));
    }
}
