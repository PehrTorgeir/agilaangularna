import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LeagueComponent } from './league/league.component';

const routes: Routes = [
  {path: '',
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
  path: ':sport/:league/:page',
  component: HomeComponent,
  title: 'League info'
}
];

export default routes;
