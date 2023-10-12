import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  baseUrl = 'https://api.everysport.com/v1';
  apiKey = '26192887ec48f76ab54167238ae16688';


  constructor(private http: HttpClient) { }

  getLeagues(): Observable<any> {
    const apiUrl = `${this.baseUrl}/leagues?sort=sport%3Aasc&teamClass=&apikey=${this.apiKey}`;
    return this.http.get(apiUrl);
  }

  getSeasons(leagueId: bigint): Observable<any> {
    const apiUrl = `${this.baseUrl}/leagues/${leagueId}/seasons?apikey=${this.apiKey}`;
    return this.http.get(apiUrl);
  }

}
