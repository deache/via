import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { GoogleMapsAPIWrapper, MapsAPILoader,  } from '@agm/core';
import { GoogleMap, Marker, MarkerOptions } from '@agm/core/services/google-maps-types';
import { Constants } from '../../constants';
import { CoreService } from '../../services/core.service';
declare var google: any;

@Component({
    selector: 'app-exploration',
    templateUrl: './exploration.component.html',
    styleUrls: ['./exploration.component.scss']
})

export class ExplorationComponent {
    @ViewChild('AgmMap') agmMap;
    public styles = Constants.mapStyles;
    public layersActive = false;
    public mapCenterLat = 25.4688014;
    public mapCenterLng = -102.0587418;
    private markerOptions: MarkerOptions = {
        position: { lat: 25.673946, lng: -100.420318 },
        clickable: false,
    };
    budget = 3000000;
    map: GoogleMap;

    constructor(public _wrapper: GoogleMapsAPIWrapper,
                public googleApi: MapsAPILoader,
                private core: CoreService) {
        this.core.getPolygons().subscribe((data: any) => {
            const polygons = JSON.parse(data.Polygons[0]);

            console.log("polygons", polygons.features);
            for (const polygon of polygons.features) {
                const coordinates = [];
                for (const point of polygon.geometry.coordinates[0]) {
                    coordinates.push({ lat: point[1], lng: point[0] });
                }
                const shape = new google.maps.Polygon({
                    paths: coordinates,
                    strokeColor: '#161616',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#7c7c7c',
                    fillOpacity: 0.35
                });
                shape.setMap(this.map);
            }
        });

        this.core.getBussinesLocations().subscribe((data: any) => {
            const construramas = data.ConstruGPS;
            const competitors = JSON.parse(data.Competencia);

            for (const constru of construramas) {
                const marker = new google.maps.Marker({
                    position: {lat: constru.latitude, lng: constru.longitude },
                    map: this.map,
                    title: 'Construrama'
                });
                marker.setIcon('../../../assets/markers/blue.png');
                marker.setMap(this.map);
            }

            for (const compet of competitors.features) {
                const coordinates = compet.geometry.coordinates;
                const marker = new google.maps.Marker({
                    position: {lat: coordinates[1], lng: coordinates[0] },
                    map: this.map,
                    title: 'Competidor'
                });
                marker.setIcon('../../../assets/markers/green.png');
                marker.setMap(this.map);
            }
        });
    }

    mapReady(map: GoogleMap) {
        this.map = map;
        const marker = new google.maps.Marker({
            position: {lat: 40.706130, lng: -74.076870},
            map: this.map,
            title: ''
        });
    }

    budgetChange(data) {
        this.budget = data.value;
    }
}
