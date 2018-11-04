import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Vendors
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';

// Components
import { AppComponent } from './app.component';
import { IntroductionComponent } from 'src/app/components/introduction/introduction.component';
import { CompareComponent } from 'src/app/components/compare/compare.component';
import { ExplorationComponent } from './components/exploration/exploration.component';

const appRoutes: Routes = [
  { path: 'introduction', component: IntroductionComponent },
  { path: 'compare',      component: CompareComponent },
  { path: 'exploration',      component: ExplorationComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    IntroductionComponent,
    ExplorationComponent,
    CompareComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAb0m2qsu5odK1JdmLa0EgFOiEZtn51NhQ'
    })
  ],
  providers: [GoogleMapsAPIWrapper],
  bootstrap: [AppComponent]
})
export class AppModule { }
