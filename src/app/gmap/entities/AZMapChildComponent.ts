import {ElementRef, Renderer, Injector, ReflectiveInjector} from '@angular/core';
import {AZApiMapsLoaderService} from "../services/az-api-maps-loader";
import {AZApiMapsWrapperService} from "../services/az-api-maps-wrapper";

export abstract class AZMapChildComponent {

    protected abstract optionsAvailable(): Array<string>;

    protected mapId: number;
    protected _element: ElementRef;

    protected _defineMapId() {
        this.mapId = this._element.nativeElement.parentNode.getAttribute('map-id');
    }

    protected getComponentOptions() {
        let prepareProp = (propName:string) => {
            let obj = {};
            obj[propName] = this[propName];
            return obj;
        };
        return this.optionsAvailable()
            .filter((option: string) => typeof this[option] !== 'undefined')
            .reduce((acc, current) => Object.assign({}, acc, prepareProp(current)), {});
    }
}