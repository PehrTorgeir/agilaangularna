import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { CommonModule } from '@angular/common';
import { SportService } from '../sport.service';


@Component({
  selector: 'app-home',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recentMatchesAmount: number = 3;
  featuredLeague: bigint = 87302n;
  featuredEvents: any[] = [];
  newReceivedData: string = '';
  sportsArray: any[] = [];
  featuredSport: bigint = 0n;
  
  constructor(private route: ActivatedRoute, private eventService: EventService, private sportService: SportService) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      if ('sport' in params) {
        this.newReceivedData = params['sport'];
        this.importFeaturedEvents();
      } else {
        this.newReceivedData = ''; // Set to default value when no sport is selected
        this.importFeaturedEvents();
      }
    });
  }
  


  private importFeaturedEvents() {
    if (this.newReceivedData !== '') {
      if (this.sportsArray.length === 0) {
        this.sportService.getSports().subscribe((response) => {
          this.sportsArray = response.sports;
          this.sportsArray.forEach(sport => {
            if (this.newReceivedData === sport.slug) {
              this.featuredSport = sport.id;
              this.eventService.getRecentEventsForSport(this.featuredSport).subscribe((response) => {
                this.featuredEvents = response.events;
              });
            }
          });
        });
      } else {
        this.sportsArray.forEach(sport => {
          if (this.newReceivedData === sport.slug) {
            this.featuredSport = sport.id;
            this.eventService.getRecentEventsForSport(this.featuredSport).subscribe((response) => {
              this.featuredEvents = response.events;
            });
          }
        });
      }
    } else {
      this.eventService.getRecentEvents().subscribe((response) => {
        this.featuredEvents = response.events;
      });
    }
  }
}
