import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DndModule } from 'ngx-drag-drop';

// Vendors
import { MatCheckboxModule, MatButtonModule, MatSliderModule, GestureConfig, MatFormFieldModule, MatSelectModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';

// Components
import { AppComponent } from './app.component';
import { IntroductionComponent } from 'src/app/components/introduction/introduction.component';
import { CompareComponent } from 'src/app/components/compare/compare.component';
import { ExplorationComponent } from './components/exploration/exploration.component';
import { PriorityOrderComponent } from './components/_shared/priority-order/priority-order.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  { path: '', redirectTo: 'introduction', pathMatch: 'full' },
  { path: 'introduction', component: IntroductionComponent },
  { path: 'compare',      component: CompareComponent },
  { path: 'exploration',      component: ExplorationComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    IntroductionComponent,
    ExplorationComponent,
    CompareComponent,
    PriorityOrderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSliderModule,
    MatFormFieldModule,
    MatSelectModule,
    DndModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAb0m2qsu5odK1JdmLa0EgFOiEZtn51NhQ'
    })
  ],
  providers: [HttpClient, GoogleMapsAPIWrapper, { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
