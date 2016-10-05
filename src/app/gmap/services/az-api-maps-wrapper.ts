import {Injectable} from '@angular/core';
import MapOptions = google.maps.MapOptions;


@Injectable()
export class AZApiMapsWrapperService {

    private _maps = new Map();
    private _index = 0;

    loadMap(mapElement: HTMLElement, options: MapOptions) {
        let map = new google.maps.Map(mapElement, options);
        this._maps.set(this._index, map);
        return this._index++;
    }

    getNativeMap(mapId: number): google.maps.Map{
        return <google.maps.Map>this._maps.get(+mapId);
    }

}