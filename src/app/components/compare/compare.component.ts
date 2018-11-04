import { Component, ViewChild } from '@angular/core';
import { GoogleMapsAPIWrapper, MapsAPILoader,  } from '@agm/core';
import { Constants } from '../../constants';
import { GoogleMap, Marker, MarkerOptions } from '@agm/core/services/google-maps-types';
declare var google: any;

@Component({
    selector: 'app-compare',
    templateUrl: './compare.component.html',
    styleUrls: ['./compare.component.scss']
})

export class CompareComponent {
    @ViewChild('AgmMap') agmMap;
    public styles = Constants.mapStyles;
    private markerOptions: MarkerOptions = {
        position: { lat: 25.673946, lng: -100.420318 },
        clickable: false,
    };

    constructor(public _wrapper: GoogleMapsAPIWrapper, public googleApi: MapsAPILoader) {
    }

    mapReady(map: GoogleMap) {
        map.setCenter({ lat: 40.706130, lng: -74.076870 });
        const marker = new google.maps.Marker({
            position: { lat: 40.706130, lng: -74.076870 },
            map: map,
            title: 'Hello World!'
        });
    }
}
