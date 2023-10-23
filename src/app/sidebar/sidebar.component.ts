import { Component, OnInit } from '@angular/core';
import { SportService } from '../sport.service';
import { LeagueService } from '../league.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SidebarService } from '../sidebar.service';
import { Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';


@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [CommonModule, RouterModule]
})
export class SidebarComponent implements OnInit {
  sports: any[] = [];
  leagues: any[] = [];
  uniqueLeagueNames: Set<string> = new Set<string>();
  currentItem: string | null = null;
  currentLeague: string | null = null;

  selectedItem: string | null = null;
  selectedLeague: string | null = null;
  private subs: Subscription[] = [];
  receivedData: string = '';

  public isSidebarOpen = true;
  toggleSidebarContent: boolean = false;

  @Output() sidebarToggled = new EventEmitter<boolean>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sportService: SportService,
    private leagueService: LeagueService,
    private sidebarService: SidebarService
  ) { }

  ngOnInit() {
   
    
    this.sportService.getSports().subscribe((response) => {
      this.sports = response.sports;
    });

    this.leagueService.getLeagues().subscribe((response) => {
      this.leagues = response.leagues;
      this.route.params.subscribe((params) => {
        this.receivedData = params['sport'];
        this.setSelectedItem(this.receivedData);
      });
    });
    this.subscribeToSidebarService();

  }
  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  private subscribeToSidebarService() {
    this.subs.push(this.sidebarService.sidebarOpen$.subscribe(isOpen => {
      this.isSidebarOpen = isOpen;
      this.sidebarToggled.emit(isOpen);
    }));

    this.subs.push(this.sidebarService.selectedItem$.subscribe(item => {
      this.selectedItem = item;
      this.filterUniqueLeagueNames();
    }));

    this.subs.push(this.sidebarService.selectedLeague$.subscribe(league => this.selectedLeague = league));
  }
  private filterUniqueLeagueNames() {
    this.uniqueLeagueNames.clear();
    this.leagues.forEach((league) => {
      if (league.sport.name === this.receivedData) {
        this.uniqueLeagueNames.add(league.name.toLowerCase());
      }
    });
  }

  transformWord(word: string): string {
    return word.toUpperCase();
  }

  createLink(checkSport: string): string | null {
    const foundLeague = this.leagues.find(league => league.name.toLowerCase() === checkSport.toLowerCase());
    if (foundLeague) {
      return foundLeague.sport.slug;
    }
    return null;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  setSelectedItem(sportName: string) {
    this.sidebarService.setSelectedItem(this.transformWord(sportName));
  }

  toggleLeagueSubMenu(leagueName: string) {
    this.sidebarService.toggleSelectedLeague(leagueName);
  }
  
}
