import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { RouterLink, RouterOutlet, RouterModule } from '@angular/router';
import { DataService } from '../data.service';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [
    HomeComponent,
    RouterLink,
    RouterOutlet,
    RouterModule,
    NgClass,
    HeaderComponent
  ],
})
export class HeaderComponent {
  activeColumnIndex: number | undefined;
  statusClass = 'hover-not-active';
 
  constructor(private dataService: DataService) {}

  sendData(message: string) {
    this.dataService.sendData(message);
    
  }
  setActiveClass(index: number): void {
    this.activeColumnIndex = index;
  }

  
  
  title = 'agilaangularna';
  


}
