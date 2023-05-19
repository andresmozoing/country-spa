import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit{

  public isLoading : boolean = false;

 public textoBusqueda : string = ''
 public countries : Country[] = []

  constructor (public countriesService : CountriesService){   }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries
    this.textoBusqueda = this.countriesService.cacheStore.byCapital.term
  }

  // get textoBusqueda() : string {
  //   return this._textoBusqueda
  // }



  async searchByCapital( term : string){
    this.isLoading = true;
    await this.countriesService.searchCapital(term)
      .subscribe( countries => {
        console.log("countries es " + countries.length);

        this.countries = countries
        this.textoBusqueda=term
        this.isLoading = false;
      })
  }

}
