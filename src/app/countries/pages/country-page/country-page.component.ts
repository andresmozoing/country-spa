import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Params, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public country? : Country ;

  constructor (private ActivatedRoute : ActivatedRoute,
              private CountriesService : CountriesService,
              private router : Router ) {}

  ngOnInit(): void {
    this.ActivatedRoute.params //params tambien devuelve un Observable
      .pipe(
        switchMap( ({id}) => this.CountriesService.searchCountryByAlphaCode(id) )
      )
      .subscribe( country => {
          if (!country){
            return this.router.navigateByUrl('')
          }
          console.log("Tenemos un pais");

          console.log({country});
          //return this.country = country;
          return
      })
  //En lugar de hacer dos subscribe anidados, podes hacer una funcion mas abajo y llamarla
  }
}
