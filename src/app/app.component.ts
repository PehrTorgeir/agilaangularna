import { Component, OnInit } from '@angular/core';
import { SportService } from './sport.service';
import { LeagueService } from './league.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
 



  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  sports: any[] = [];
  leagues: any[] = [];

  constructor(private sportService: SportService, private leagueService: LeagueService) {}

  ngOnInit() {
    this.sportService.getSports().subscribe((response) => {
        this.sports = response.sports;
      });
    this.leagueService.getLeagues().subscribe((response) => {
        this.leagues = response.leagues;
    })
  }


  title = 'agilaangularna';
  
}

