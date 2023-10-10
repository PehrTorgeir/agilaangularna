import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { LeagueService } from '../league.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-league',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {
  seasons: any[] = [];
  leagues: any[] = [];
  receivedData: string = '';
  constructor(private leagueService: LeagueService, private route: ActivatedRoute, private router: Router) {}
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      const newReceivedData = params['league'].charAt(0).toUpperCase() + params['league'].slice(1);
      if (this.receivedData !== newReceivedData) {
        this.receivedData = newReceivedData;
        this.getDataBasedOnMessage();
      }
    });
  }

  private getDataBasedOnMessage() {
    this.seasons = [];
    this.leagueService.getLeagues().subscribe((response) => {
      this.leagues = response.leagues;
      console.log(this.leagues);
      this.getSeasonsBasedOnLeague();
    });
    
  }

  private getSeasonsBasedOnLeague() {
    this.leagues.forEach((league) => {
      
      if (league.name === this.receivedData){
        this.leagueService.getSeasons(league.id).subscribe((response) => {
          this.seasons = response.leagues;
          console.log(this.leagues);
          
        });
      }
    })
  }
}
