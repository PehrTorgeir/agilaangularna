import { Component } from '@angular/core';
import { SportService } from './sport.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //template:`<body>tjenare</body>`
 



  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sports:any[] =[];
  constructor(private sportService:SportService){

  }

  ngOnInit(){
    this.sportService.getSports().subscribe((data:any[])=>{this.sports=data;});
  }


  title = 'agilaangularna';
  
}

