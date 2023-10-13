import { Component, OnInit } from '@angular/core';
import { SportService } from '../sport.service';
import { LeagueService } from '../league.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sports: any[] = [];
  leagues: any[] = [];
  uniqueLeagueNames: Set<string> = new Set<string>();

  constructor(private sportService: SportService, private leagueService: LeagueService) { }

  ngOnInit() {
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
      if (!this.uniqueLeagueNames.has(name)) {
        this.uniqueLeagueNames.add(league.name.toLowerCase());
      }
    });
  }

  transformWord(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  createLink(checkSport: string) {
    const foundLeague = this.leagues.find(league => league.name.toLowerCase() === checkSport.toLowerCase());
    if (foundLeague) {
      const link = foundLeague.sport.slug + "/" + checkSport;
      console.log(link);
      return link;
    }
    return null;
  }
}
