import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
