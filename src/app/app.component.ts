import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DataService } from './data.service';
import { Flight } from './flight';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  angularForm: FormGroup; 
  message: string;

  private flights: Flight[] = [];

  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.angularForm = this.fb.group({
      flightNumber: [''],
      origin: ['ORD'],
      destination: [''],
      fdate: ['2018-01-31']

    });

  }





  get_flights() {
    if (this.angularForm.value['flightNumber'] || (this.angularForm.value['origin'] && this.angularForm.value['destination'])) {     
        this.flights = this.filterFlights(this.dataService.get_flights() );
    
    }
    else {
      this.message = "Either flight number or both origin & destination codes!"
      this.flights = [];
      return;
    }
  }


  filterFlights(webResp: Flight[]){
    let results: Flight[] = [];
    let flightNumber = this.angularForm.value['flightNumber'] ;
    let origin = this.angularForm.value['origin'].toUpperCase() ;    
    let destination = this.angularForm.value['destination'].toUpperCase();
    let fdate = this.angularForm.value['fdate'];

    for (let index = 0; index < webResp.length; index++) {
      const f :Flight  = webResp[index];
      if(flightNumber && f.flightNumber != flightNumber.trim()) continue;
      if(origin && f.origin != origin.trim()) continue;
      if(destination && f.destination != destination.trim()) continue;
      if(f.departure.startsWith(fdate) ||   f.arrival.startsWith(fdate )) 
            results.push(f);
    }

    if(results.length == 0)
      this.message = "No flights found";
      else
      this.message = results.length +" flights found";


    return results;
  }






}
