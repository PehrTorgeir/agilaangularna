import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { LeagueService } from '../league.service';
import { EventService } from '../event.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd, RouterLink, RouterOutlet } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { ContentComponent } from '../content/content.component';

@Component({
  selector: 'app-league',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    SidebarComponent,
    HeaderComponent,
    ContentComponent
  ],
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {
  seasons: any[] = [];
  leagues: any[] = [];
  recentEvents: any[] = [];
  standings: any[] = [];
  receivedData: string = '';
  selectedSeason: any;
  leagueName: string = '';
  seasonControl = new FormControl();

  constructor(private eventService: EventService, private leagueService: LeagueService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if ('league' in params) {
        const newReceivedData = params['league'].charAt(0).toUpperCase() + params['league'].slice(1);
      if (this.receivedData !== newReceivedData) {
        this.receivedData = newReceivedData;
        this.getDataBasedOnMessage();
      }
      }
    });
  }

  private getDataBasedOnMessage() {
    this.seasons = [];
    this.leagueService.getLeagues().subscribe((response) => {
      this.leagues = response.leagues;
      this.getSeasonsBasedOnLeague();
    });
  }

  private getSeasonsBasedOnLeague() {
    for (let index = 0; index < this.leagues.length; index++) {
      const league = this.leagues[index];
      if (league.name.toLowerCase() === this.receivedData.toLowerCase()) {
        this.leagueService.getSeasons(league.id).subscribe((response) => {
          this.seasons = response.leagues;
          this.getStandingsForSeason(this.seasons[0].id);
          this.leagueName = this.seasons[0].name;
          if (this.seasons.length > 0) {
            this.seasonControl.setValue(this.seasons[0]);
          }
          console.log(this.seasons);

        });
        break;
      }
    }
  }

  private getStandingsForSeason(seasonId: bigint) {
    this.leagueService.getStandings(seasonId).subscribe((response) => {
      this.standings = response.groups[0].standings;
    });
    this.getRecentEventsForSeason(seasonId);
  }

  private getRecentEventsForSeason(seasonId: bigint) {
    this.eventService.getRecentEvents(seasonId).subscribe((response) => {
      this.recentEvents = response.events;
      console.log(this.standings);
      
    })
  }

  selectSeason(season: any) {
    this.selectedSeason = season;
    this.leagueService.getStandings(season.id).subscribe((response) => {
      this.standings = response.groups[0].standings;
    })
    this.eventService.getRecentEvents(season.id).subscribe((response) => {
      this.recentEvents = response.events;
    }
    )
  }

}
