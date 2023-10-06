import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SportService {
  baseUrl = 'https://api.everysport.com/v1';
  apiKey = '26192887ec48f76ab54167238ae16688';


  constructor(private http: HttpClient) { }

  getSports(): Observable<any> {
    const apiUrl = `${this.baseUrl}/sports?apikey=${this.apiKey}`;
    return this.http.get(apiUrl);
  }

}
