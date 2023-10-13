import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MatchService {
  baseUrl = 'https://api.everysport.com/v1';
  apiKey = '26192887ec48f76ab54167238ae16688';


  constructor(private http: HttpClient) { }

  getMatches(ofLeague:BigInt): Observable<any> {
    const apiUrl = `${this.baseUrl}/events?league=${ofLeague}&apikey=${this.apiKey}`;
    console.log(apiUrl);
    return this.http.get(apiUrl);
  }

}
