import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  baseUrl = 'https://api.everysport.com/v1';
  apiKey = '26192887ec48f76ab54167238ae16688';


  constructor(private http: HttpClient) { }

  getMatches(ofLeague: BigInt): Observable<any> {
    const apiUrl = `${this.baseUrl}/events?league=${ofLeague}&apikey=${this.apiKey}`;
    console.log(apiUrl);
    return this.http.get(apiUrl);
  }

  getRecentEventsForLeague(amount: number, leagueId: bigint): Observable<any> {
    const apiUrl = `${this.baseUrl}/events?fields=all&limit=${amount}&sort=startDate%3Adesc&league=${leagueId}&apikey=${this.apiKey}`;
    return this.http.get(apiUrl);
  }

  getRecentEvents(): Observable<any> {
    const apiUrl = `${this.baseUrl}/events?fields=all&limit=10&sort=startDate%3Adesc&apikey=${this.apiKey}`;
    return this.http.get(apiUrl);
  }

  getAllEventsForLeague(leagueId: bigint): Observable<any> {
    const apiUrl = `${this.baseUrl}/events?sort=round%3Aasc&league=${leagueId}&apikey=${this.apiKey}&limit=500`;
    return this.http.get(apiUrl);
  }
  getRecentEventsForSport(sport: bigint): Observable<any> {
    const apiUrl = `${this.baseUrl}/events?sort=round%3Adesc&limit=10&sport=${sport}&apikey=${this.apiKey}`;
    return this.http.get(apiUrl);


  }

}
