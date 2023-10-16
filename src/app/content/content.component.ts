import { Component } from '@angular/core';
import { LeagueComponent } from '../league/league.component';

@Component({
  selector: 'app-content',
  standalone:true,
  imports:[LeagueComponent],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {

}
