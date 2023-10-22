import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HomeComponent,
    RouterLink,
    RouterOutlet,
    HeaderComponent, SidebarComponent,ContentComponent,
   
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  
}

