import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataSubject: any;

  sendData(data: any) {
    this.dataSubject = data;
  }

  getData() {
    return this.dataSubject;
  }
}
