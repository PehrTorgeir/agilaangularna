import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home-view',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {
  recentMatchesAmount: number = 3;
  featuredLeague: bigint = 87302n;
  featuredEvents: any[] = [];

  constructor(private router: ActivatedRoute, private eventService: EventService) {}

  ngOnInit(): void {
    this.importFeaturedEvents();
  }

  private importFeaturedEvents() {
    this.eventService.getRecentEvents(10).subscribe((response) => {
      this.featuredEvents = response.events;
    });
  }
}
