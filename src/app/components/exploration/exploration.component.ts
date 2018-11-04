import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { GoogleMapsAPIWrapper, MapsAPILoader,  } from '@agm/core';
import { GoogleMap, Marker, MarkerOptions } from '@agm/core/services/google-maps-types';
import { Constants } from '../../constants';
import { CoreService } from '../../services/core.service';
import { Router } from '@angular/router';
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
    state: any;

    constructor(public _wrapper: GoogleMapsAPIWrapper,
                public googleApi: MapsAPILoader,
                private core: CoreService,
                private router: Router) {
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
                marker.setIcon('../../../assets/markers/construramas.png');
                marker.setMap(this.map);
            }

            for (const compet of competitors.features) {
                const coordinates = compet.geometry.coordinates;
                const marker = new google.maps.Marker({
                    position: {lat: coordinates[1], lng: coordinates[0] },
                    map: this.map,
                    title: 'Competidor'
                });
                marker.setIcon('../../../assets/markers/competidors.png');
                marker.setMap(this.map);
            }
        });

        const pesos: any = this.core.getPesos();
        this.state = pesos.state;
        this.budget = pesos.inversion;
    }

    mapReady(map: GoogleMap) {
        this.map = map;
        this.map.setCenter({lat: 25.686613, lng: -100.316116});
        const newConstruramas = this.core.getNewConstruramas();
        console.log("new construramas", newConstruramas);
        for (const item of newConstruramas) {
            const marker = new google.maps.Marker({
                position: {lat: item.Lat, lng: item.Long },
                map: this.map,
                title: 'Nuevo Construrama'
            });
            marker.setIcon('../../../assets/markers/new.png');
            marker.setMap(this.map);
        }
    }

    budgetChange(data) {
        this.budget = data.value;
    }

    goToCompare() {
        this.router.navigate(['compare']);
    }
}
