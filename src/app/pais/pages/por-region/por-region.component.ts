import { Component } from '@angular/core';
import { IPaisAPI } from '../../interfaces/IPaisApi';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  template: `
    <h1 class="text-4xl font-bold">Por región</h1>
    <h2 class="text-lg mt-2">Buscar país por región</h2>
    <hr class="my-4">
    <h2>Seleccione la región</h2>
    <div class="flex gap-3 flex-wrap">
      <button
        *ngFor="let region of regiones"
        class="app-list-item pt-0"
        [class.app-list-item-active] = "region === termino"
        (click)="activarRegion( region )">{{region}}</button>
    </div>
    <div *ngIf="hayError" class="bg-red-600 lg:mx-auto font-bold p-2 rounded-md my-4">
      No se encontro nada con el término "{{termino}}"
    </div>
    <app-pais-tabla [paises]="paises" [hayError]="hayError"></app-pais-tabla>`,
})
export class PorRegionComponent {

  public termino: string = '';
  private _hayError: boolean = false;
  private _paises: IPaisAPI[] = [];
  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  constructor (private paisService: PaisService) {}

  public get paises(): IPaisAPI[] {
    return this._paises;
  }

  public get hayError(): boolean {
    return this._hayError;
  }

  public get regiones(): string[] {
    return this._regiones;
  }

  public activarRegion(region: string): void {
    if(this.termino !== region) this.buscar( region );
    this.termino = region;
  }

  private buscar(termino: string): void {
    this._hayError = false;
    this.termino = termino;

    this.paisService.buscarPaisRegion(this.termino).subscribe(
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

}
