


import { Component, OnInit } from '@angular/core';
import { LeagueComponent } from '../league/league.component';
import { HomeViewComponent } from '../home-view/home-view.component';
import { ScheduleComponent } from '../schedule/schedule.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content',
  standalone:true,
  imports:[
    LeagueComponent,
    HomeViewComponent,
    ScheduleComponent,
    CommonModule
  ],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  selectedView: string = '';
  constructor(private route: ActivatedRoute) {}


  ngOnInit(): void {
 
    this.route.params.subscribe(params => {
      
      if (params['page'] === 'overview') {
        this.selectedView = 'leaguepage';
      } else if (params['page'] === 'schedule') {
        this.selectedView = 'schedulepage'
      } else if ('sport' in params) {
        this.selectedView = 'sportpage';
      } else {
        this.selectedView = 'homepage';
      }
    });
    
    
  }
}




// import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// import { LeagueComponent } from '../league/league.component';
// import { HomeViewComponent } from '../home-view/home-view.component';
// import { ScheduleComponent } from '../schedule/schedule.component';
// import { CommonModule } from '@angular/common';
// import { DataService } from '../data.service';
// import { FormControl } from '@angular/forms';
// import { EventService } from '../event.service';
// import { ReactiveFormsModule } from '@angular/forms';
// import { LeagueService } from '../league.service';
// import { ActivatedRoute, Router, NavigationEnd, RouterLink, RouterOutlet } from '@angular/router';
// import { ViewportScroller } from '@angular/common';

// @Component({
//   selector: 'app-content',
//   standalone: true,
//   imports: [
//     LeagueComponent,
//     HomeViewComponent,
//     ScheduleComponent,
//     CommonModule,
//     ReactiveFormsModule
//   ],
//   templateUrl: './content.component.html',
//   styleUrls: ['./content.component.css']
// })
// export class ContentComponent implements OnInit {
//   @Output() sectionInView: EventEmitter<string> = new EventEmitter<string>();

//   recentMatchesAmount: number = 3;
//   featuredLeague: bigint = 87302n;
//   featuredEvents: any[] = [];
//   currentSection: string = '';

//   constructor(private dataService: DataService, private eventService: EventService, private leagueService: LeagueService, private route: ActivatedRoute, private router: Router, private viewportScroller: ViewportScroller) {
//     this.route.params.subscribe((params) => {
//       this.currentSection = params['section'];


//     });
//   }

//   ngOnInit(): void {
//     const options = {
//       root: null, // Using viewport
//       rootMargin: '0px',
//       threshold: 0.5 // Adjust if needed
//     };

//     const observer = new IntersectionObserver((entries, obs) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           this.sectionInView.emit(entry.target.id);
//         }
//       });
//     }, options);

    // const sections = document.querySelectorAll('.section');
    // sections.forEach(section => {
    //   observer.observe(section);
    // });
    // this.importFeaturedEvents();

//   }



//   private importFeaturedEvents() {
//     this.eventService.getRecentEvents(10).subscribe((response) => {
//       this.featuredEvents = response.events;
//     });
//   }
// }
