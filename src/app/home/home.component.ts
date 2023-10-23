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
      }

    });
    this.importFeaturedEvents();
  }





  private importFeaturedEvents() {


    if (this.newReceivedData === '') {

      this.eventService.getRecentEvents(10).subscribe((response) => {
        this.featuredEvents = response.events;
      });
    } else {

      this.sportService.getSports().subscribe((response) => {
        this.sportsArray = response.sports;


        this.sportsArray.forEach(element => {
          console.log(this.newReceivedData);

          if (element.slug === this.newReceivedData) {
            this.featuredSport = element.id;
            console.log(this.featuredSport);



          }
        });


      });
      console.log(this.featuredSport);





      this.eventService.getRecentEventsForSport(this.featuredSport);
    }
  }
}
