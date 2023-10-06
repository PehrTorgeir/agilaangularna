import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SportComponent } from './sport/sport.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
{
  path: '',
  component: HomeComponent,
  title: 'Home page'
},
{
  path: ':sport',
  component: SportComponent,
  title: 'Fotboll info'
}
];

export default routes;
