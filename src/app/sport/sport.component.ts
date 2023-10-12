import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { LeagueService } from '../league.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sport',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.css']
})
export class SportComponent implements OnInit {
  leagues: any[] = [];
  receivedData: string = '';
  uniqueLeagueNames: Set<string> = new Set<string>();

  constructor(private leagueService: LeagueService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
   this.route.params.subscribe(params => {
      const newReceivedData = params['sport'].charAt(0).toUpperCase() + params['sport'].slice(1);
      if (this.receivedData !== newReceivedData) {
        this.receivedData = newReceivedData;
        this.getDataBasedOnMessage();
      }
    });
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
        if (league.sport.name === this.receivedData) {
          this.uniqueLeagueNames.add(league.name.toLowerCase());
        }
}
});
  }

  transformWord(word:string) {
    return word.charAt(0).toUpperCase()+word.slice(1);
  }
}