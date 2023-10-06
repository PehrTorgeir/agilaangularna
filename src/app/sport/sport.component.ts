import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { LeagueService } from '../league.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private dataService: DataService, private leagueService: LeagueService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.dataService.getData().subscribe(message => {
      if (message != null) {
        this.receivedData = message;
      }
    });
    this.route.params.subscribe(params => {
      if (this.receivedData === '') {
        this.receivedData = params['sport'].charAt(0).toUpperCase() + params['sport'].slice(1);
        
      }
    });
    this.leagueService.getLeagues().subscribe((response) => {
      this.leagues = response.leagues;
    })
  }
}
