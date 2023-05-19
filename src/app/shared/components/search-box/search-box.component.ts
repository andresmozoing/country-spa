import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime, pipe } from 'rxjs';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  @Input()
  public placeHolder:string = '';

  @Input()
  public text : string = '';

  @Output()
  public onBusqueda : EventEmitter<string> = new EventEmitter<string>();
  @Output()
  public onDebounce : EventEmitter<string> = new EventEmitter<string>();

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription? : Subscription

  ngOnInit(): void {
      this.debouncerSubscription = this.debouncer
                                    .pipe(debounceTime(300))
                                    .subscribe( value => {
                                        this.onDebounce.emit (value);
                                      })
  }


  buscar(valor : string):void{
    if ( valor.length === 0) return

    this.onBusqueda.emit(valor)
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe()
  }

}
