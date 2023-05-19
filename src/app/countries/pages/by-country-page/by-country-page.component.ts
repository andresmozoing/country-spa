import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit{

  public paises : Country [] =[];
  public textoBusqueda : string =''

  constructor (public CountriesService : CountriesService){}

  ngOnInit(){
    this.paises = this.CountriesService._cacheStore.byCountry.countries
    this.textoBusqueda = this.CountriesService._cacheStore.byCountry.term
  }

  searchByCountry( countryName : string){
    console.log("llego al searchByCountry");


    this.CountriesService.searchCountry(countryName)
      .subscribe( countries => {
        console.log("Los countries cuando llega el subscribe de por pais es " , countries);
        this.paises = countries;
        this.textoBusqueda = countryName
      })
  }


}
