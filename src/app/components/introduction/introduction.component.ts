import { Component } from '@angular/core';
import { GoogleMapsAPIWrapper, MapsAPILoader,  } from '@agm/core';
import { GoogleMap, Marker, MarkerOptions } from '@agm/core/services/google-maps-types';
declare var google: any;
import Speech from 'speak-tts';

@Component({
    selector: 'app-introduction',
    templateUrl: './introduction.component.html',
    styleUrls: ['./introduction.component.scss']
})

export class IntroductionComponent{
    private speech: Speech = new Speech();

    private stepActive: number;

    private stateFade: boolean;
    private stateDiag: boolean = false;

    private question: string;
    private questions: Array<any> = [
        {m: '¡Hola Pedro!<br/>Bienvenido de regreso, encontremos<br>el mejor punto de venta', t: 5500, s: 1},
        {m: '¿Cuales son las prioridades del<br>cliente?', t: 4000, s: 2},
        {m: '¿Cuál es el presupuesto con el que se<br>cuenta?', t: 5000, s: 3},
        {m: '¿Que área vamos a explorar hoy?', t: 5000, s: 4}
    ];

    constructor() {

        this.question = this.questions[0].m;
        this.stateFade = true;
        this.speak(this.questions[0], true);
    }

    mapReady(map: GoogleMap): void {
        map.setCenter({lat: 25.686613, lng: -100.316116});
    }

    private speak(step: any, speak: boolean): void {
        this.speech.speak({ text: step.m });
        this.stepActive = step.s;

        if (speak) {
            this.speakTime(step);
        } else {
            setTimeout(() => {
                this.stateDiag = true;
            }, step.t);
        }
    }

    private speakTime(step: any): void {
        setTimeout(() => {
            this.stateFade = false;
            setTimeout(() => {
               this.question = this.questions[step.s].m;
               this.stateFade = true;
               this.speak(this.questions[step.s], false);
            }, 3000);
        }, step.t);
    }

    private next(): void {

    }

    private prev(): void {

    }
}
