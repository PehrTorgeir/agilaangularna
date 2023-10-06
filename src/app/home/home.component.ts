import { Component, OnInit } from '@angular/core';
import { SportService } from '../sport.service';
import { LeagueService } from '../league.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule
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

  private filterUniqueLeagueNames() {
    this.leagues.forEach(league => {
      const name = league.name;
      if (!this.uniqueLeagueNames.has(name)) {
        this.uniqueLeagueNames.add(name);
      }
    });
  }

}
