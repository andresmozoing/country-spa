import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, pipe } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl : string = "https://restcountries.com/v3.1/"

  constructor(private http: HttpClient) { }

  private getCountriesByRequest(url:string):Observable<Country[]>{
    return this.http.get<Country[]>(url)
      .pipe(
        delay(2000),
        catchError(() => of([]))
      )
  }

  searchCapital( capitalABuscar : string) : Observable<Country[]>{
    const url = this.apiUrl + '/capital/' + capitalABuscar

    return this.getCountriesByRequest(url)
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

  searchCountryByAlphaCode( code: string ): Observable<Country | null> {

    const url = `${ this.apiUrl }/alpha/${ code }`;

    return this.http.get<Country[]>( url )
      .pipe(
        map( countries => countries.length > 0 ? countries[0]: null ),
        catchError( () => of(null) )
      );
  }

}
