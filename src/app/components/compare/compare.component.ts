import { Component, ViewChild, Input, ChangeDetectorRef, OnInit } from '@angular/core';
import { GoogleMapsAPIWrapper, MapsAPILoader, } from '@agm/core';
import { Constants } from '../../constants';
import { GoogleMap, Marker, MarkerOptions } from '@agm/core/services/google-maps-types';
import { from, forkJoin, Observable, Observer } from 'rxjs';
declare var google: any;

@Component({
    selector: 'app-compare',
    templateUrl: './compare.component.html',
    styleUrls: ['./compare.component.scss']
})

export class CompareComponent {
    public isLoading: boolean = true;

    @ViewChild('AgmMap') agmMap;
    public styles = Constants.mapStyles;

    public optionPointOfSales: any[] = [
        {
            investmentEarnings: "$14,804.00 MXN",
            investmentDuration: "4 años 2 meses",
            geolocation: {
                longitude: -88.707049,
                latitude: 19.746826
            },
            location: {
                street: '',
                neighborhood: '',
                area: '',
                zipCode: ''
            },
            populationNow: "215,000",
            populationProjection: "425,000",
            companiesCompetitors: "4",
            companiesFavorables: "10",
            transitPerHour: "510",
            squareMeterCost: "$10,214.00 MXN"
        },
        {
            investmentEarnings: "$90,204.00 MXN",
            investmentDuration: "1 años 2 meses",
            geolocation: {
                longitude: -109.945222,
                latitude: 27.464697
            },
            location: {
                street: '',
                neighborhood: '',
                area: '',
                zipCode: ''
            },
            populationNow: "4,200,000",
            populationProjection: "7,300,000",
            companiesCompetitors: "18",
            companiesFavorables: "4",
            transitPerHour: "690",
            squareMeterCost: "$18,684.00 MXN"
        },
        {
            investmentEarnings: "$23,345.00 MXN",
            investmentDuration: "2 años",
            geolocation: {
                longitude: -99.68818,
                latitude: 21.548017
            },
            location: {
                street: '',
                neighborhood: '',
                area: '',
                zipCode: ''
            },
            populationNow: "630,000",
            populationProjection: "1,080,000",
            companiesCompetitors: "9",
            companiesFavorables: "7",
            transitPerHour: "420",
            squareMeterCost: "$8,209.00 MXN"
        }
    ];

    constructor(public _wrapper: GoogleMapsAPIWrapper, public googleApi: MapsAPILoader, private cd: ChangeDetectorRef) {
    }


    mapReady(map: GoogleMap) {
        map.setCenter({lat: 40.706130, lng: -74.076870});

        let geocoder = new google.maps.Geocoder;
        let buffer = [];
        for (let i = 0; i < this.optionPointOfSales.length; i++) {
            const pos = this.optionPointOfSales[i];
            const latlng = new google.maps.LatLng(pos.geolocation.latitude, pos.geolocation.longitude);
            const obs = this.getGeocoderObservable(geocoder, latlng);
            buffer.push(obs);
        }

        forkJoin(buffer).subscribe(res => {
            for (let i = 0; i < res.length; i++) {
                if (res[i].length > 0) {
                    let location = res[i][0].address_components;
                    if (location.length > 1) {
                        this.optionPointOfSales[i].location.street = location[0].long_name + ' ' + location[1].long_name;
                    }
                    if (location.length > 2) {
                        this.optionPointOfSales[i].location.neighborhood = location[2].long_name;
                    }
                    if (location.length > 5) {
                        this.optionPointOfSales[i].location.zipCode = location[5].long_name;
                        this.optionPointOfSales[i].location.area = location[3].long_name + ', ' + location[4].long_name;
                    }
                }
            }
            this.isLoading = false;
            
            this.cd.detectChanges();
            this.cd.markForCheck();
        });
    }

    getGeocoderObservable(geocoder: any, latlng: any) {
        return Observable.create((observer: Observer<any[]>) => {
            geocoder.geocode({ location: latlng }, (
                (results: any[], status: any) => {
                    if (status === google.maps.GeocoderStatus.OK) {
                        observer.next(results);
                        observer.complete();
                    } else {
                        console.log('Geocoding service: geocoder failed due to: ' + status);
                        observer.error(status);
                    }
                })
            )
        });
    }
}
