import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Params } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {


  constructor (private ActivatedRoute : ActivatedRoute,
              private CountriesService : CountriesService ) {}

  ngOnInit(): void {
    this.ActivatedRoute.params
      .subscribe( params => {
        console.log("params es " + params['id']);
        const id = params['id']
        this.CountriesService.searchCountryByAlphaCode(id)
          .subscribe(country =>{
            console.log("country es " , country);

          })
      })
  }


}
