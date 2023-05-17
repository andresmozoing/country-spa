import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError , of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl : string = "https://restcountries.com/v3.1/"

  constructor(private http: HttpClient) { }

  searchCapital( capitalABuscar : string) : Observable<Country[]>{
    const url = this.apiUrl + '/capital/' + capitalABuscar

    return this.http.get<Country[]>(url)
              .pipe(
                catchError(() => of([]))
                )
  }

  searchRegion( regionABuscar : string) : Observable<Country[]>{
    const url = this.apiUrl + '/region/' + regionABuscar

    return this.http.get<Country[]>(url)
              .pipe(
                catchError(() => of([]))
                )
  }

  searchCountry( paisABuscar : string) : Observable<Country[]>{
    const url = this.apiUrl + '/name/' + paisABuscar

    return this.http.get<Country[]>(url)
              .pipe(
                catchError(() => of([]))
                )
  }

  searchCountryByAlphaCode( alphaCode : string) : Observable<Country[]>{
    const url = this.apiUrl + '/alpha/' + alphaCode

    return this.http.get<Country[]>(url)
              .pipe(
                catchError(() => of([]))
                )
  }

}
