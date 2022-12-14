import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

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
        (input)="teclaPresionada()"
        autocomplete="off"
        autocapitalize="off"
        [placeholder]="titleBuscador"
        class="w-full rounded-md pl-2 py-2 outline-none text-slate-900 focus:outline-2 focus:outline-sky-500">
    </form>`,
})
export class PaisBuscadorComponent implements OnInit{

  @Output()
  public onEnter: EventEmitter<string> = new EventEmitter;

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter;

  public debouncer: Subject<string> = new Subject();

  @Input()
  public descripBuscador: string = '';

  @Input()
  public titleBuscador: string = '';

  public termino: string = '';

  public ngOnInit(): void {
    this.debouncer
      .pipe(
        debounceTime(300)
      )
      .subscribe(
        valor => {
          this.onDebounce.emit( valor );
        }
      );
  }

  public teclaPresionada(): void {
    this.debouncer.next( this.termino );
  }

}
