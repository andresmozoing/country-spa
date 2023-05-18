import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent {

  public paises : Country[] = []

  public isLoading : boolean = false;

  constructor (public CountriesService : CountriesService){   }

  async searchByCapital( term : string){
    this.isLoading = true;
    console.log('Desde byCapitalPage')
    console.log(term);
    await this.CountriesService.searchCapital(term)
      .subscribe( countries => {
        console.log("countries es " + countries.length);

        this.paises = countries
        console.log(this.paises)
        this.isLoading = false;
      })
  }

}
