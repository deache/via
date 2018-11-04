import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class CoreService {
  private apiUrl = 'https://b9bbcc68.ngrok.io/';
  public pesos = {};
  public newConstruramas = [];

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

  public postIntroduction(data: any) {
    const url = this.apiUrl + 'inputs_intro';
    return this.http.post(url, data);
  }

  public getPesos() {
    return this.pesos;
  }

  public setPesos(pesos: any) {
    this.pesos = pesos;
  }

  public setNewConstruramas(construramas: any[]) {
    this.newConstruramas = construramas;
  }

  public getNewConstruramas() {
    return this.newConstruramas;
  }
}
