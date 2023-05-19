import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/Region.type';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})



export class ByRegionPageComponent implements OnInit {

  public paises : Country[] = []
  public regiones : Region[] = ['Africa','Americas' , 'Asia','Europe','Oceania']
  public selectedRegion! : Region

  constructor(public CountriesService:CountriesService){
  }

  ngOnInit(): void {
    this.paises = this.CountriesService._cacheStore.byRegion.countries
    if (this.CountriesService._cacheStore.byRegion.region)
      this.selectedRegion = this.CountriesService._cacheStore.byRegion.region
  }



  searchByRegion(regionAbuscar:Region){
    this.selectedRegion = regionAbuscar
    this.CountriesService.searchRegion(regionAbuscar)
      .subscribe( countries =>{
        this.paises = countries;
      })
  }
}
