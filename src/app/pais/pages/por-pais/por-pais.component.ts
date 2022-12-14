import { Component } from '@angular/core';
import { IPaisAPI } from '../../interfaces/IPaisApi';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  template: `
    <app-pais-buscador
      titleBuscador="Buscar por país"
      descripBuscador="Realice una búsqueda por país"
      (onEnter)="buscar( $event )"
      (onDebounce)="sugerencias( $event )"></app-pais-buscador>

    <ul class="bg-slate-800 rounded-md">
      <li
        *ngFor="let pais of paisesSugeridos"
        class="flex p-2 items-center cursor-pointer hover:bg-slate-700 justify-between"
        (click)="buscar( pais.name )">
        <div class="flex items-center gap-2">
          <img src="{{pais.flag}}" class="w-12" alt="pais">
          <p>{{pais.name}}</p>
        </div>
        <p
          class="px-2 py-1 bg-sky-500 hover:bg-sky-400 rounded-md"
          [routerLink]="['/pais', pais.alpha2Code]">Ver país</p>
      </li>
    </ul>

    <div *ngIf="hayError" class="bg-red-600 lg:mx-auto font-bold p-2 rounded-md my-4">
      No se encontro nada con el término "{{termino}}"
    </div>
    <app-pais-tabla [paises]="paises" [hayError]="hayError"></app-pais-tabla>`
})
export class PorPaisComponent {

  public termino: string = '';
  private _hayError: boolean = false;
  private _paises: IPaisAPI[] = [];
  private _paisesSugeridos: IPaisAPI[] = [];

  constructor (private paisService: PaisService) {}

  public get paises(): IPaisAPI[] {
    return this._paises;
  }

  public get hayError(): boolean {
    return this._hayError;
  }

  public get paisesSugeridos (): IPaisAPI[] {
    return this._paisesSugeridos;
  }

  public buscar(termino: string): void {
    this._paisesSugeridos = [];
    this._hayError = false;
    this.termino = termino;

    this.paisService.buscarPais(this.termino).subscribe(
      (paises: IPaisAPI[]) => {
        this._paises = paises;
      },
      (error) => {
        this._hayError = true;
        this._paises = [];
        console.log(error);
      }
    );
  }

  public sugerencias(termino: string): void {
    this._hayError = false;

    this.paisService.buscarPais( termino ).subscribe(
      (paises: IPaisAPI[]) => this._paisesSugeridos = paises.splice(0, 5),
      error => this._paisesSugeridos = []
    );
  }

}

