#Project description

It is a working draft of google maps for angular2. It just covers private needs, but you're welcome to use it in your project or contribute to it.
The project is only in development, so you shouldn't use it on production.

#How to install from github

Github version contains 2 modules. src/app/gmap/gmap.module.ts which contains angular2 google maps feature, and src/app/app.module.ts, that shows how to use angular2 google maps.
You can use it for contributing.

Run in a console

```
git clone git@github.com:maksymzav/angular2-gmaps.git
cd angular-gmaps
npm install
npm start
```

#How to install from npm
Only module for work with google maps is published to npm, you can use it directly in your project.

##Download a package from npm
`npm install [-S] angular2-gmaps`

##Include the angular2-gmaps module to your application (app.module.ts)
```
@NgModule({
    ...
    imports: [
        ...,
        GmapsModule
    ],
    ...
})
```

## Include angular2-gmaps directives to your template.
E.g. to include empty map, add this html to your template:
```
 <az-map [centerLat]="47.56" [centerLng]="30.58" [zoom]="8" >
 </az-map>
```
For more examples refer to the api below.

#angular2-gmaps API, or how to use ot in your application.

For the current moment, implemented and tested features are a map itself, displaying a direction, adding markers, and adding polylines.

###Initialize empty map 
To include empty map, add this html to your template:
```
 <az-map [centerLat]="47.56" [centerLng]="30.58" [zoom]="8" >
 </az-map>
```

###Display a direction
To display a direction on your map, use "[direction]" attribute:
```
<az-map [centerLat]="47.56" [centerLng]="30.58" [zoom]="8" [direction]="direction">
</az-map>
```
Obviously, to make this code working, you need to define a direction property in your component class, it will be an Observable.
So , your component should import Observable and Observer types:
`import {Observable, Observer} from "rxjs/Rx";`
and define a direction property and initialize it with an Observable, that will pass e.g.:
```
public direction = Observable.create((observer:Observer<DirectionsRequest>)=> {
        observer.next({
            origin: {lat: 47.5, lng: 30.6},
            destination: {lat: 47.4, lng: 30.3},
            travelMode: google.maps.TravelMode.DRIVING,
            optimizeWaypoints: true,
            waypoints: [
                {
                    location: new google.maps.LatLng(47.3, 30.9),
                    stopover: false
                },
                {
                    location: new google.maps.LatLng(47.2, 30.1),
                    stopover: false
                }
            ]
        });
    });
```

###Add markers
To add a marker, add az-map-marker tag inside your az-map tag, and specify the [latitude] and [longitude]. For each marker you need a new az-map-marker tag.
```
<az-map [centerLat]="47.56" [centerLng]="30.58" [zoom]="8">
        <az-map-marker *ngFor="let coord of coords" [latitude]="coord.lat" [longitude]="coord.lng"></az-map-marker>
    </az-map>
```
This example assumes, you will define coords property in your components class, that will be an array of objects with structure: `[{lat: number, lng: number}]`

###Add a polyline
To add a polyline, ad a az-map-polyline tag inside your az-map tag:
```
<az-map-polyline
                [polylinePath]="'omubHwpkuEglCb`Ea~A~lEelCdPoa@glA|hDijB|o@uaB|iAakF~qCopA|r@|gA'"
                [strokeColor]="'navy'"
        ></az-map-polyline>
```
Except for polylinePath and strokeColor you can set any other properties, described in google maps Polylines API (https://developers.google.com/maps/documentation/javascript/shapes#polylines).