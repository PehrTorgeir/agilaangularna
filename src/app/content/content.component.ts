import { Component, OnInit } from '@angular/core';
import { LeagueComponent } from '../league/league.component';
import { HomeViewComponent } from '../home-view/home-view.component';
import { ScheduleComponent } from '../schedule/schedule.component';
import { StatsComponent } from '../stats/stats.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content',
  standalone:true,
  imports:[
    LeagueComponent,
    HomeViewComponent,
    ScheduleComponent,
    StatsComponent,
    CommonModule
  ],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  selectedView: string = '';
  constructor(private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      
      if (params['page'] === 'overview') {
        this.selectedView = 'leaguepage';
      } else if (params['page'] === 'schedule') {
        this.selectedView = 'schedulepage'
      } else if (params['page'] === 'stats') {
        this.selectedView = 'statspage'
      } else if ('sport' in params) {
        this.selectedView = 'sportpage';
      } else {
        this.selectedView = 'homepage';
      }
    });
    
  }
}
