import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flight } from './Flight';

@Injectable()
export class DataService {
  baseUrl: string = "./assets/db.json";
  flights:  Flight[];

  constructor(private httpClient: HttpClient) {
    this.httpClient.get(this.baseUrl  ).subscribe((res: Flight[]) => {
      this.flights =  res;
    });
  }


  get_flights() {
    return this.flights;
  }



}
