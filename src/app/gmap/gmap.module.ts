import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import {AZMapComponent} from "./components/az-map/az-map.component";
import {AZMapMarkerComponent} from "./components/az-map-marker/az-map-marker.component";
import {AZMapPolylineComponent} from "./components/az-map-polyline/az-mp-polyline.component";
import {AZApiMapsLoaderService} from "./services/az-api-maps-loader";
import {AZApiMapsWrapperService} from "./services/az-api-maps-wrapper";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AZMapComponent,
        AZMapMarkerComponent,
        AZMapPolylineComponent
    ],
    exports: [
        AZMapComponent,
        AZMapMarkerComponent,
        AZMapPolylineComponent
    ],
    providers: [
        AZApiMapsLoaderService,
        AZApiMapsWrapperService
    ]
})
export class GmapsModule { }