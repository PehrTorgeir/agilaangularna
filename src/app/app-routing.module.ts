import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OverviewComponent } from './league/overview/overview.component';
import { ScheduleComponent } from './league/schedule/schedule.component';
import { StatsComponent } from './league/stats/stats.component';

const routes: Routes = [
  {path: '',
  component: HomeComponent,
  title: 'Home page',
},
{
  path: ':sport',         // TODO: Vi borde ha något när länken endast är en sport och ingen league
  component: HomeComponent,
  title: 'Sport info'
},

// ----- League routing -----
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
}
];

export default routes;
