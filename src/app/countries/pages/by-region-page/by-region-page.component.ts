import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';


type Region = 'Africa'|'Americas'| 'Asia'|'Europe'|'Oceania'
@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})



export class ByRegionPageComponent {

  public paises : Country[] = []
  public regiones : Region[] = ['Africa','Americas' , 'Asia','Europe','Oceania']
  public selectedRegion! : Region

  constructor(public CountriesService:CountriesService){
  }

  searchByRegion(regionAbuscar:Region){
    this.selectedRegion = regionAbuscar
    this.CountriesService.searchRegion(regionAbuscar)
      .subscribe( countries =>{
        this.paises = countries;
      })
  }
}
