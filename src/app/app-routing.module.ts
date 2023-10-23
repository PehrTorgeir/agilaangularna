import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';


import { Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: ':sport',
    component: HomeComponent,
    title: 'Sport info'
  },
  {
    path: ':sport/:league',
    redirectTo: ':sport/:league/overview',
    pathMatch: 'full',
  },
  {
    path: ':sport/:league',
    redirectTo: ':sport/:league/overview',
    pathMatch: 'full',
  },

  {
    path: ':sport/:league/:page',
    component: HomeComponent,
    title: 'League info'
  }


  // { path: '', redirectTo: '/Home', pathMatch: 'full' },
  // { path: 'home', component: HomeComponent },
  // { path: ':sportName', component: HomeComponent },
  // { path: '**', redirectTo: '/Home' }
];



export default routes;
