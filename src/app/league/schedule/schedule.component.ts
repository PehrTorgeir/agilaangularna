import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { LeagueService } from 'src/app/league.service';
import { EventService } from 'src/app/event.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd, RouterLink, RouterOutlet } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from 'src/app/sidebar/sidebar.component';
import { HeaderComponent } from 'src/app/header/header.component';

@Component({
  standalone: true,
  selector: 'app-schedule',
  imports: [RouterLink,
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    SidebarComponent,
    HeaderComponent,
    MatIconModule],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})

export class ScheduleComponent implements OnInit{
  seasons: any[] = [];
  leagues: any[] = [];

  allEvents: any[] = [];
  rounds: any[] = [];
  selectedRound: any;
  roundEvents: any[] = [];

  receivedData: string = '';
  selectedSeason: any;
  leagueName: string = '';
  seasonControl = new FormControl();
  roundsControl = new FormControl();

  doesLeagueExist: boolean = false;

  constructor(private eventService: EventService, private leagueService: LeagueService, private route: ActivatedRoute, private router: Router) { }

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
          if (this.seasons.length > 0) {
            this.seasonControl.setValue(this.seasons[0]);
          }
        });
        break;
      }
    }
  }

  private getRoundsFromSeason() {
    this.allEvents.forEach(element => {
      if (!this.rounds.includes(element.round)) {
        this.rounds.push(element.round);
      }
    });
  }

  selectRound(round: any) {
    this.selectedRound = round;
    this.roundEvents = [];
    this.allEvents.forEach(element => {
      if (element.round == round) {
        this.roundEvents.push(element);
      }
    });
  }

  selectNext() {
    const currentValue = this.roundsControl.value;
    const currentIndex = this.rounds.findIndex(round => round === currentValue);
    if (currentIndex < this.rounds.length - 1) {
        this.roundsControl.setValue(this.rounds[currentIndex + 1]);
        this.selectRound(this.rounds[currentIndex + 1]);
        console.log(this.rounds[currentIndex + 1]);
    }
  }

  selectPrevious() {
    const currentValue = this.roundsControl.value;
    const currentIndex = this.rounds.findIndex(round => round === currentValue);
    if (currentIndex > 0) {
        this.roundsControl.setValue(this.rounds[currentIndex - 1]);
        this.selectRound(this.rounds[currentIndex - 1]);
        console.log(this.rounds[currentIndex - 1]);
    }
  }

  selectSeason(season: any) {
    this.selectedSeason = season;
    this.getLeagueStats(season.id);
  }

  private getLeagueStats(seasonId: bigint) {
    this.eventService.getAllEventsForLeague(seasonId).subscribe((response) => {
      this.allEvents = response.events;
      this.getRoundsFromSeason();
      if (this.rounds.length > 0) {
        this.roundsControl.setValue(this.rounds[this.rounds.length-1]);
        this.selectRound(this.rounds[this.rounds.length-1]);
      }
    });
  }
}