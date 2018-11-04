import { Component } from '@angular/core';
import { GoogleMapsAPIWrapper, MapsAPILoader,  } from '@agm/core';
import { GoogleMap, Marker, MarkerOptions } from '@agm/core/services/google-maps-types';
declare var google: any;
import Speech from 'speak-tts';
import { ViewChild } from '@angular/core';
import { Constants } from '../../constants';
import { CoreService } from 'src/app/services/core.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-introduction',
    templateUrl: './introduction.component.html',
    styleUrls: ['./introduction.component.scss']
})

export class IntroductionComponent {

    @ViewChild('order') public _order;

    public states = Constants.states;

    private speech: Speech = new Speech();

    private stepActive: number;
    private quantity: number;
    private state: any;

    private stateFade: boolean;
    private showContent: boolean;
    private showContentQua: boolean;
    private showContentSts: boolean;
    private orderShow: boolean;
    private expanded: boolean = false;
    private stateDiag: boolean = false;
    private fadeLogo: boolean = false;
    private fadeInLogo: boolean = false;

    private quantityShow: boolean = false;
    private stateShow: boolean = false;

    private question: string;
    private questions: Array<any> = [
        {m: '¡Hola Pedro!<br/>Bienvenido de regreso, encontremos<br>el mejor punto de venta', t: 5500, s: 1},
        {m: '¿Cuales son las prioridades del<br>cliente?', t: 4000, s: 2},
        {m: '¿Cuál es el presupuesto y <br>el área de interes?', t: 4000, s: 3},
        {m: '¿Que área vamos a explorar hoy?', t: 5000, s: 4}
    ];

    constructor(private core: CoreService, private router: Router) {

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
            switch (step.s) {
                case 1:
                    this.speakTime(step);
                    break;
                case 2:
                    this.speakTime(step);
                    break;
                case 3:
                    this.expanded = false;
                    this.fadeLogo = false;
                    this.fadeInLogo = false;
                    this.timeOutDiagonal(step);
                    break;
                // case 4:
                //     this.expanded = false;
                //     this.fadeLogo = false;
                //     this.fadeInLogo = false;
                //     this.timeOutDiagonal(step);
                //     break;
            }
        } else {
            this.timeOutDiagonal(step);
        }
    }

    private timeOutDiagonal(step) {
        setTimeout(() => {
            this.stateDiag = true;
            switch (step.s) {
                case 2:
                    setTimeout(() => {
                       this.stateFade = true;
                       this.showContent = true;
                       this.orderShow = true;
                    }, 3000);
                    break;
                case 3:
                    setTimeout(() => {
                       this.stateFade = true;
                       this.quantityShow = true;
                       this.showContentQua = true;
                    }, 3000);
                    break;
                // case 3:
                //     setTimeout(() => {
                //        this.stateFade = true;
                //        this.quantityShow = true;
                //        this.showContentQua = true;
                //     }, 3000);
                //     break;
            }
        }, step.t);
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

    private continuedFlow(i: number): void {
        setTimeout(() => {
            this.question = this.questions[i].m;
            this.stateFade = true;
            this.fadeInLogo = true;
            this.orderShow = false;
            this.quantityShow = false;
            this.stateDiag = false;
            this.expanded = true;
            this.speak(this.questions[i], true);
        }, 3000);
    }

    private next(): void {
        console.log('step', this.stepActive);
        switch (this.stepActive) {
            case 2:
                setTimeout(() => {
                   this.stateFade = false;
                   this.showContent = false;
                   this.fadeLogo = true;
                   this.continuedFlow(2);
                }, 100);
                break;
            case 3:
                const pesos = {
                    pesos: this._order.getPriorityOptions().map( it => it.content),
                    inversion: this.quantity,
                    estado: this.state.id,
                    state: this.state.estado,
                };

                this.core.postIntroduction(pesos).subscribe((data: any) => {
                    this.core.setNewConstruramas(data);
                    this.core.setPesos(pesos);
                    this.router.navigate(['exploration']);
                });

                console.log('response', pesos);
        }

    }

    private prev(): void {

    }
}
