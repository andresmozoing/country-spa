import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent {

  public paises : Country [] =[];

  constructor (public CountriesService : CountriesService){}


  searchByCountry( countryName : string){
    console.log("llego al searchByCountry");


    this.CountriesService.searchCountry(countryName)
      .subscribe( countries => {
        console.log("Los countries cuando llega el subscribe de por pais es " , countries);
        this.paises = countries;
      })
  }


}
