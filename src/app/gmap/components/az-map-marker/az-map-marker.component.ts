import {Component, OnInit, Input, ElementRef} from '@angular/core';
import {AZApiMapsLoaderService} from "../../services/az-api-maps-loader";
import {AZApiMapsWrapperService} from "../../services/az-api-maps-wrapper";
import {AZMapChildComponent} from "../../entities/AZMapChildComponent";

declare var google:any;

@Component({
    selector: 'az-map-marker',
    template: ''
})
export class AZMapMarkerComponent extends AZMapChildComponent implements OnInit {
    @Input() public latitude:number;
    @Input() public longitude:number;

    constructor(protected _element:ElementRef, private _loader:AZApiMapsLoaderService, private _wrapper:AZApiMapsWrapperService) {
        super();
    }

    public optionsAvailable(): any[]{
        return [];
    }

    ngOnInit() {
        this._loader.load().then(()=> {
            this._defineMapId();
            this.createMarker();
        });
    }

    private createMarker() {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(+this.latitude, +this.longitude),
            map: this._wrapper.getNativeMap(this.mapId),
            title: 'Hello World!'
        });
    }

}