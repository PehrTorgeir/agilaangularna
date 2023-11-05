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

  getStandings(leagueId: bigint): Observable<any> {
    const apiUrl = `${this.baseUrl}/leagues/${leagueId}/standings?apikey=${this.apiKey}`;
    return this.http.get(apiUrl);
  }

  getScoringLeaders(leagueId: bigint): Observable<any> {
    const apiUrl = `${this.baseUrl}/leagues/${leagueId}/scoring-leaders?limit=10&apikey=${this.apiKey}`;
    return this.http.get(apiUrl);
  }

  getAssistLeaders(leagueId: bigint): Observable<any> {
    const apiUrl = `${this.baseUrl}/leagues/${leagueId}/assist-leaders?limit=10&apikey=${this.apiKey}`;
    return this.http.get(apiUrl);
  }

  getPointLeaders(leagueId: bigint): Observable<any> {
    const apiUrl = `${this.baseUrl}/leagues/${leagueId}/point-leaders?limit=10&apikey=${this.apiKey}`;
    return this.http.get(apiUrl);
  }

  // Vi har ej access till nedanstående data

  // getBookingLeaders(leagueId: bigint): Observable<any> {
  //   const apiUrl = `${this.baseUrl}/leagues/${leagueId}/booking-leaders?limit=10&apikey=${this.apiKey}`;
  //   return this.http.get(apiUrl);
  // }

  // getSentOffLeaders(leagueId: bigint): Observable<any> {
  //   const apiUrl = `${this.baseUrl}/leagues/${leagueId}/sent-off-leaders?limit=10&apikey=${this.apiKey}`;
  //   return this.http.get(apiUrl);
  // }
}
