import { Component, OnInit } from '@angular/core';
import { SportService } from '../sport.service';
import { LeagueService } from '../league.service';
import { CommonModule } from '@angular/common';

import { ActivatedRoute, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,
    RouterLink, RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],

})
export class SidebarComponent implements OnInit {
  sports: any[] = [];
  leagues: any[] = [];
  receivedData: string = '';
  uniqueLeagueNames: Set<string> = new Set<string>();
  toggleSidebarContent: boolean = true;


  constructor(private route: ActivatedRoute, private router: Router, private sportService: SportService, private leagueService: LeagueService) { }

  ngOnInit() {
   
    this.route.params.subscribe(params => {
      let newReceivedData='';
      if('sport' in params){
         newReceivedData = params['sport'].charAt(0).toUpperCase() + params['sport'].slice(1);
       
      }
    
      
      if ('league' in params) {
        this.toggleSidebarContent=false;
      }
      if (this.receivedData !== newReceivedData) {
        this.receivedData = newReceivedData;
        this.getDataBasedOnMessage();
      }
    });
    this.sportService.getSports().subscribe((response) => {
      this.sports = response.sports;
    });
    this.leagueService.getLeagues().subscribe((response) => {
      this.leagues = response.leagues;
      this.filterUniqueLeagueNames();
    })
  }

  private getDataBasedOnMessage() {
    this.leagues = [];
    this.uniqueLeagueNames = new Set<string>();
    this.leagueService.getLeagues().subscribe((response) => {
      this.leagues = response.leagues;
      this.filterUniqueLeagueNames();
    });
  }

  private filterUniqueLeagueNames() {
    this.leagues.forEach((league) => {
      const name = league.name;
      if (this.receivedData === "") {
        this.uniqueLeagueNames.add(league.name.toLowerCase());
      }
      if (!this.uniqueLeagueNames.has(name)) {

        if (league.sport.name === this.receivedData) {
          this.uniqueLeagueNames.add(league.name.toLowerCase());
        }

      }
    });
  }

  transformWord(word: string) {
    return word.toUpperCase();
  }

  createLink(checkSport: string) {

    const foundLeague = this.leagues.find(league => league.name.toLowerCase() === checkSport.toLowerCase());
    if (foundLeague) {
      let link;
      if (this.receivedData !== "") {
        link = checkSport;

      } else {
        link = foundLeague.sport.slug + "/" + checkSport;
      }

      return link;
    }
    return null;
  }

}
