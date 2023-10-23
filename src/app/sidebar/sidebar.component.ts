import { Component, OnInit } from '@angular/core';
import { SportService } from '../sport.service';
import { LeagueService } from '../league.service';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, RouterLink, Router, ActivationEnd } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';
import { SidebarService } from '../sidebar.service';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgbModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],

})
export class SidebarComponent implements OnInit {
  public isSidebarOpen = true;
  toggleSidebarContent: boolean = false;
  private subs: Subscription[] = [];
  sports: any[] = [];
  leagues: any[] = [];
  filteredLeagueNames: Set<string> = new Set<string>();
  uniqueLeagues = new Map<string, string>();
  selectedItem: string | null = null; // Variable to track selected item
  selectedSport: string | null = null;
  @Output() sidebarToggled = new EventEmitter<boolean>();
  constructor(private route: ActivatedRoute, private router: Router, private sportService: SportService, private leagueService: LeagueService, private sidebarService: SidebarService, private breakpointObserver: BreakpointObserver) {
    const layoutChanges = breakpointObserver.observe("(max-width: 768px)");

    layoutChanges.subscribe(result => {
      if ((this.isSidebarOpen === true)&&(breakpointObserver.isMatched("(max-width: 768px)"))) {
        this.sidebarService.toggleSidebar();
      }
      else if ((this.isSidebarOpen === false)&&(!breakpointObserver.isMatched("(max-width: 768px)"))) {
        this.sidebarService.toggleSidebar();
      }
    });

  }

  ngOnInit() {
    this.initializeData();
    this.router.events
      .pipe(
        filter(e => (e instanceof ActivationEnd)),
        map(e => e instanceof ActivationEnd ? e.snapshot.params : {})
      )
      .subscribe(params => {
        if ('sport' in params) {
          //newReceivedData = params['sport'].charAt(0).toUpperCase() + params['sport'].slice(1);
          this.selectedSport = params['sport'].charAt(0).toUpperCase() + params['sport'].slice(1);
          this.updateLeagueFilter();
        } else {
          this.resetLeagueFilter();
        }

        if ('league' in params) {
          this.selectedItem = params['league'];
        } else {
          this.selectedItem = null;
        }
      });

    this.sportService.getSports().subscribe((response) => {
      this.sports = response.sports;
    });
    this.subscribeToSidebarService();
  }
  private subscribeToSidebarService() {
    this.subs.push(this.sidebarService.sidebarOpen$.subscribe(isOpen => {
      this.isSidebarOpen = isOpen;
      this.sidebarToggled.emit(isOpen);
    }));
  }
  private initializeData() {
    this.leagueService.getLeagues().subscribe((response) => {
      this.leagues = response.leagues;
      this.filterUniqueLeagueNames();
      this.updateLeagueFilter();
    });
  }

  private filterUniqueLeagueNames() {
    this.leagues.forEach((league) => {
      if (!(league.name in this.uniqueLeagues.keys())) {
        this.uniqueLeagues.set(league.name, league.sport.name);
      }
    });
  }

  updateLeagueFilter() {
    if (this.selectedSport === null) {
      this.resetLeagueFilter();
    }
    else {
      this.filteredLeagueNames.clear();
      for (let [key, value] of this.uniqueLeagues) {
        if (value === this.selectedSport) {
          this.filteredLeagueNames.add(key);
        }
      }
    }
  }
  resetLeagueFilter() {
    this.filteredLeagueNames.clear();
    this.selectedItem = null;
    for (let league of this.uniqueLeagues.keys()) { this.filteredLeagueNames.add(league) };
  }


  transformWord(word: string) {
    return word.toUpperCase();
  }

  createLink(checkSport: string) {
    const foundLeague = this.leagues.find(league => league.name.toLowerCase() === checkSport.toLowerCase());
    if (foundLeague) {
      
      return foundLeague.sport.slug;
    }
    return null;

  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}

