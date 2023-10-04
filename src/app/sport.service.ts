import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SportService {
  apiUrl='https://api.everysport.com/v1/sports';


  constructor(private http: HttpClient) { }

  getSports() : Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}`);
  }


  
  

 
}
