import { Component, OnInit } from '@angular/core';
import { SportService } from '../sport.service';
import { LeagueService } from '../league.service';
import { CommonModule } from '@angular/common';

import { ActivatedRoute, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,
    RouterLink
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
  selectedItem: string | null = null; // Variable to track selected item


  constructor(private route: ActivatedRoute, private router: Router, private sportService: SportService, private leagueService: LeagueService) { }

  ngOnInit() {

    this.sportService.getSports().subscribe((response) => {
      this.sports = response.sports;
    });

    this.route.params.subscribe(params => {
      let newReceivedData = '';
      if ('sport' in params) {
        newReceivedData = params['sport'].charAt(0).toUpperCase() + params['sport'].slice(1);
      }

      if ('league' in params) {
        this.toggleSidebarContent = false;
        this.selectedItem = params['league'];
      }
      this.receivedData = newReceivedData;
      this.getDataBasedOnMessage();
    });
  }

  private getDataBasedOnMessage() {
    this.leagueService.getLeagues().subscribe((response) => {
      this.leagues = response.leagues;
      this.filterUniqueLeagueNames();
    });
  }

  private filterUniqueLeagueNames() {
    this.leagues.forEach((league) => {
      if (!this.uniqueLeagueNames.has(league.name)) {
        if (this.receivedData === "") {
          this.uniqueLeagueNames.add(league.name.toLowerCase());
        } else if (league.sport.name === this.receivedData) {
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
      return foundLeague.sport.slug;
    }
    return null;
  }



}

