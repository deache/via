import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class CoreService {
  private apiUrl = 'https://b9bbcc68.ngrok.io/';

  constructor(private http: HttpClient) {

  }

  public getBussinesLocations() {
    const url = this.apiUrl + 'prueba1';
    return this.http.get(url);
  }

  public getPolygons() {
    const url = this.apiUrl + 'prueba2';
    return this.http.get(url);
  }
}
