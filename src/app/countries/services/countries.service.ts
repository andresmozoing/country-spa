import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, pipe, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/Region.type';

@Injectable({providedIn: 'root'})
export class CountriesService implements OnInit {

  private apiUrl : string = "https://restcountries.com/v3.1/"
  public _cacheStore : CacheStore = {
    byCapital: {
      term: '',
      countries: []
    },
    byCountry: {
      term: '',
      countries : []
    },
    byRegion: {
      region :'',
      countries :[]
    }
  }

  get cacheStore() : CacheStore {
    return this._cacheStore;
  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage()
  }

  ngOnInit(): void {
    this.loadFromLocalStorage()
  }

  private saveToLocalStorage (){
    localStorage.setItem('cacheStore',JSON.stringify(this.cacheStore))
  }

  private loadFromLocalStorage(){
   if (!localStorage.getItem('cacheStore'))
      return
   else{
     this._cacheStore = JSON.parse( localStorage.getItem('cacheStore')! );
   }
  }

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
            .pipe(
              tap(countries => {
                this._cacheStore.byCapital = {countries : countries,term:capitalABuscar}
                this.saveToLocalStorage()
              }
                )
            )
  }

  searchRegion( regionABuscar : Region) : Observable<Country[]>{
    const url = this.apiUrl + '/region/' + regionABuscar
    return this.getCountriesByRequest(url)
            .pipe(
              tap(countries => this._cacheStore.byRegion = {countries , region : regionABuscar}),
              tap(countries => this.saveToLocalStorage())
            )
  }

  searchCountry( paisABuscar : string) : Observable<Country[]>{
    const url = this.apiUrl + '/name/' + paisABuscar
    return this.getCountriesByRequest(url)
            .pipe(
              tap(countries => this._cacheStore.byCountry = {countries, term:paisABuscar}),
              tap(countries => this.saveToLocalStorage())
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
