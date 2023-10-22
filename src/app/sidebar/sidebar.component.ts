import { Component, OnInit } from '@angular/core';
import { SportService } from '../sport.service';
import { LeagueService } from '../league.service';
import { CommonModule } from '@angular/common';

import { ActivatedRoute, RouterLink, Router, ActivationEnd, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs';

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
  filteredLeagueNames: Set<string> = new Set<string>();
  //uniqueLeagues: { [leagueName: string]: string } = {};
  uniqueLeagues = new Map<string, string>();
  toggleSidebarContent: boolean = true;
  selectedItem: string | null = null; // Variable to track selected item
  selectedSport: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private sportService: SportService, private leagueService: LeagueService) {
    
   }

  ngOnInit() {
    console.log('sidebar init');
    this.getData();
    this.router.events
      .pipe(
        filter(e => (e instanceof ActivationEnd)),
        map(e => e instanceof ActivationEnd ? e.snapshot.params : {})
      )
      .subscribe(params => {
      if ('sport' in params) {
        //newReceivedData = params['sport'].charAt(0).toUpperCase() + params['sport'].slice(1);
        this.selectedSport = params['sport'].charAt(0).toUpperCase() + params['sport'].slice(1);
        this.updateLeagueFilter();
        console.log(this.selectedSport);
      }
      else {
        this.resetLeagueFilter();
      }

      if ('league' in params) {
        this.selectedItem = params['league'];
      }
      else {
        this.selectedItem = null;
      }
      });

    this.sportService.getSports().subscribe((response) => {
      this.sports = response.sports;
    });
    console.log(this.filteredLeagueNames);
  }

  private getData() {
    this.leagueService.getLeagues().subscribe((response) => {
      this.leagues = response.leagues;
      this.filterUniqueLeagueNames();
      this.updateLeagueFilter();
    });
  }

  private filterUniqueLeagueNames() {
    this.leagues.forEach((league) => {
      if (!(league.name in this.uniqueLeagues.keys())) {
        this.uniqueLeagues.set(league.name, league.sport.name);
        //this.uniqueLeagueNames.add(league.name.toLowerCase());
        /*
        if (this.receivedData === "") {
          this.uniqueLeagueNames.add(league.name.toLowerCase());
        } else if (league.sport.name === this.receivedData) {
          this.uniqueLeagueNames.add(league.name.toLowerCase());
        }
        */
      }

    });
    //console.log(this.uniqueLeagues.values());
  }
  resetLeagueFilter() {
    console.log(this.uniqueLeagues);
    this.filteredLeagueNames.clear();
    this.selectedItem = null;
    for (let league of this.uniqueLeagues.keys()) {this.filteredLeagueNames.add(league)};
  }
  updateLeagueFilter() {
    if (this.selectedSport === null) {
      this.resetLeagueFilter();
    }
    else {
      this.filteredLeagueNames.clear();
      for (let [key, value] of this.uniqueLeagues) {
        if (value === this.selectedSport) {
          this.filteredLeagueNames.add(key);
        }
      }
    }
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

