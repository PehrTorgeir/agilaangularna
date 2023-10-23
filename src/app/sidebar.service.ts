import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private _sidebarOpen = new BehaviorSubject<boolean>(true);
  private _selectedItem = new BehaviorSubject<string | null>(null);
  private _selectedLeague = new BehaviorSubject<string | null>(null);

  sidebarOpen$ = this._sidebarOpen.asObservable();
  selectedItem$ = this._selectedItem.asObservable();
  selectedLeague$ = this._selectedLeague.asObservable();

  toggleSidebar() {
    this._sidebarOpen.next(!this._sidebarOpen.value);
  }

  setSelectedItem(item: string) {
    this._selectedItem.next(item);
  }

  toggleSelectedLeague(league: string) {
    this._selectedLeague.next(this._selectedLeague.value === league ? null : league);
  }
}
