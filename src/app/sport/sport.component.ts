import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { LeagueService } from '../league.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sport',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.css']
})
export class SportComponent implements OnInit {
  leagues: any[] = [];
  receivedData: string = '';

  constructor(private dataService: DataService, private leagueService: LeagueService) {}

  ngOnInit() {
    this.dataService.getData().subscribe(message => {
      this.receivedData = message;
    });
    this.leagueService.getLeagues().subscribe((response) => {
      this.leagues = response.leagues;
    })
  }
}
