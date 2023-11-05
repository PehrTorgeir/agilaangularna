import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OverviewComponent } from './league/overview/overview.component';
import { ScheduleComponent } from './league/schedule/schedule.component';
import { StatsComponent } from './league/stats/stats.component';

import { SportExistsGuard } from './sport-exists.guard';
import { Error404Component } from './error404/error404.component';
const routes: Routes = [
  {
    path: 'error404',
    component: Error404Component,
    title: 'error'
  },
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: ':sport',
    component: HomeComponent,
    canActivate: [SportExistsGuard],
    title: 'Sport info'
  },
  {
    path: ':sport/:league',
    redirectTo: ':sport/:league/overview',
    pathMatch: 'full',
  },
  {
    path: ':sport/:league/overview',
    component: OverviewComponent,
    title: 'League overview'
  },
  {
    path: ':sport/:league/schedule',
    component: ScheduleComponent,
    title: 'League schedule'
  },
  {
    path: ':sport/:league/stats',
    component: StatsComponent,
    title: 'League stats'
  }, 
  {
    path: '**',
    component: Error404Component,
    title: 'Error 404'
  },

];

export default routes;
