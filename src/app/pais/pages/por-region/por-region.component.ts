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
    <div class="flex gap-3">
      <button
        *ngFor="let region of regiones"
        class="bg-sky-500 hover:bg-sky-400 py-1 px-2 rounded-md"
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
    this.termino = region;
  }



}
