import { Component, OnInit } from '@angular/core';
import { LeagueComponent } from '../league/league.component';
import { HomeViewComponent } from '../home-view/home-view.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content',
  standalone:true,
  imports:[
    LeagueComponent,
    HomeViewComponent,
    CommonModule
  ],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  homeView:boolean = true;

  constructor(private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.homeView = true;
    this.route.params.subscribe(params => {
      if ('sport' in params) {
        this.homeView = false;
      }
    });
    
  }
}
