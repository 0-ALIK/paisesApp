import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

@Component({
  selector: 'app-pais-buscador',
  template: `
    <h1 class="text-4xl font-bold">{{titleBuscador}}</h1>
    <h2 class="text-lg mt-2">{{descripBuscador}}</h2>
    <hr class="my-4">
    <form (ngSubmit)="onEnter.emit( termino )">
      <input
        [(ngModel)]="termino"
        type="text"
        name="termino"
        autocomplete="off"
        [placeholder]="titleBuscador"
        class="w-full rounded-md pl-2 py-2 outline-none text-slate-900 focus:outline-2 focus:outline-sky-500">
    </form>`,
})
export class PaisBuscadorComponent {

  @Output()
  public onEnter: EventEmitter<string> = new EventEmitter;

  @Input()
  public descripBuscador: string = '';

  @Input()
  public titleBuscador: string = '';

  public termino: string = '';

}
