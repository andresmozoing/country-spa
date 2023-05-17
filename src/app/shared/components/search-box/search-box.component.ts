import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent {

  @Input()
  public placeHolder:string = '';

  @Output()
  public onBusqueda : EventEmitter<string> = new EventEmitter<string>();

  //@ViewChild('username') txtInput: ElementRef<HTMLInputElement> | undefined;

  buscar(valor : string):void{
    if ( valor.length === 0) return

    this.onBusqueda.emit(valor)
  }
}
