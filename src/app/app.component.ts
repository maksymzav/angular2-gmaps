import {Component} from '@angular/core';
import '../../public/css/styles.css';
import {Observable, Observer} from "rxjs/Rx";
import DirectionsRequest = google.maps.DirectionsRequest;

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    public coords = [
        {lat: 43.1, lng: 70.1},
        {lat: 43.3, lng: 70.9},
        {lat: 43.4, lng: 70.3},
        {lat: 43.5, lng: 70.6}
    ];

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

    public coords2 = [
        {lat: 47.5, lng: 30.6},
        {lat: 47.4, lng: 30.3},
        {lat: 47.3, lng: 30.9},
        {lat: 47.2, lng: 30.1}
    ];
}

//