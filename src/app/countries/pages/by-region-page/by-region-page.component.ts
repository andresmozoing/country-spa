import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {

  public paises : Country[] = []

  constructor(public CountriesService:CountriesService){

  }

  searchByRegion(regionAbuscar:string){
    this.CountriesService.searchRegion(regionAbuscar)
      .subscribe( countries =>{
        this.paises = countries;
      })
  }
}
