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
  standalone: true,
  selector: 'app-stats',
  imports: [RouterLink,
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    SidebarComponent,
    HeaderComponent,
    ContentComponent],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit{
  scoringLeaders: any[] = [];
  assistLeaders: any[] = [];
  pointLeaders: any[] = [];

  seasons: any[] = [];
  leagues: any[] = [];

  receivedData: string = '';
  selectedSeason: any;
  leagueName: string = '';
  seasonControl = new FormControl();

  doesLeagueExist: boolean = false;

  constructor(private dataService: DataService, private eventService: EventService, private leagueService: LeagueService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if ('league' in params) {
        const newReceivedData = params['league'].charAt(0).toUpperCase() + params['league'].slice(1);
        if (this.receivedData !== newReceivedData) {
          this.receivedData = newReceivedData;
          this.getDataBasedOnMessage();
          this.doesLeagueExist = true;
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
          this.getLeagueStats(this.seasons[0].id);
          this.leagueName = this.seasons[0].name;
          this.dataService.sendData(this.seasons[0]);
          if (this.seasons.length > 0) {
            this.seasonControl.setValue(this.seasons[0]);
          }
        });
        break;
      }
    }
  }

  selectSeason(season: any) {
    this.selectedSeason = season;
    this.dataService.sendData(season);
    this.getLeagueStats(season.id);
  }

  private getLeagueStats(seasonId: bigint) {
    this.leagueService.getScoringLeaders(seasonId).subscribe((response) => { //Sets the scoring leaders
      this.scoringLeaders = response.playerStats;
    });

    this.leagueService.getAssistLeaders(seasonId).subscribe((response) => { //Sets the assist leaders
      this.assistLeaders = response.playerStats;
    });

    this.leagueService.getPointLeaders(seasonId).subscribe((response) => { //Sets the point leaders
      this.pointLeaders = response.playerStats;
    });
  }
}
