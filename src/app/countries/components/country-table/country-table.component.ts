import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'countries-table',
  templateUrl: './country-table.component.html',
  styles: [
    `img {
      width:25px
    }`
  ]
})
export class CountryTableComponent {

  @Input()
  public countries : Country [] = []

}
