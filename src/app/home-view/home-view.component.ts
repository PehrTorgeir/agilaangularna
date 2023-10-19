import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home-view',
  standalone: true,
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {
  recentMatchesAmount: number = 3;
  featuredLeague: string = 'Allsvenskan'

  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.importFeaturedEvents();
  }

  private importFeaturedEvents() {
    console.log(this.featuredLeague);
  }
}
