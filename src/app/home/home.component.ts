import { Component, OnInit } from '@angular/core';

import { RouterLink, RouterOutlet, Router, NavigationEnd ,ActivatedRoute} from '@angular/router';
import { HeaderComponent } from '../header/header.component';

import { ContentComponent } from '../content/content.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HomeComponent,
    RouterLink,
    RouterOutlet, HeaderComponent, ContentComponent, SidebarComponent, CommonModule
  ],

  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isSidebarOpen = true;
  constructor(private router: Router, private route: ActivatedRoute) { }


  onSidebarToggled(opened: boolean) {
    this.isSidebarOpen = opened;
  }

  ngOnInit() {
   

 
  
}


}
