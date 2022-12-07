import { Component } from '@angular/core';
import { IPaisAPI } from '../../interfaces/IPaisApi';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  template: `
    <h1 class="text-4xl font-bold">Por país</h1>
    <h2 class="text-lg mt-2">Resultados por país</h2>

    <hr class="my-4">

    <form (ngSubmit)="buscar()">
      <input
        [(ngModel)]="termino"
        type="text"
        name="termino"
        autocomplete="off"
        placeholder="Buscar país.."
        class="w-full rounded-md pl-2 py-2 outline-none text-slate-900 focus:outline-2 focus:outline-sky-500">
    </form>

    <hr class="my-4">

    <div *ngIf="hayError" class="bg-red-600 lg:mx-auto lg:w-2/3 font-bold p-2 rounded-md">
      No se encontro nada con el término {{termino}}
    </div>

    <div *ngIf="!hayError && paises.length !== 0" class="table text-slate-50 mx-auto w-full mb-4">
      <div class="table-header-group bg-slate-800">
        <div class="table-row">
          <div class="table-cell rounded-tl-lg py-4 pl-8 border-b">#</div>
          <div class="table-cell pl-4 border-b">Bandera</div>
          <div class="table-cell pl-4 border-b">Nombre</div>
          <div class="table-cell pl-4 border-b">Población</div>
          <div class="table-cell pr-4 pl-4 border-b rounded-tr-lg">Más info..</div>
        </div>
      </div>
      <div class="table-row-group bg-slate-700">
        <div *ngFor="let pais of paises; let i = index" class="table-row">
          <div class="table-cell border-b py-4 pl-8">{{i+1}}</div>
          <div class="table-cell border-b pl-4"><img src="{{pais.flag}}" class="w-10" alt="flank"></div>
          <div class="table-cell border-b pl-4">{{pais.name}}</div>
          <div class="table-cell border-b pl-4">{{pais.population | number}}</div>
          <div class="table-cell border-b pl-4"><a [routerLink]="['/pais', pais.alpha2Code]">Ver más</a></div>
        </div>
      </div>
    </div>`
})
export class PorPaisComponent {

  public termino: string = 'Panama';

  private _hayError: boolean = false;

  private _paises: IPaisAPI[] = [];


  constructor (private paisService: PaisService) {}


  public get paises(): IPaisAPI[] {
    return this._paises;
  }

  public get hayError(): boolean {
    return this._hayError;
  }


  public buscar(): void {
    this._hayError = false;
    console.log(this.termino);

    this.paisService.buscarPais(this.termino).subscribe(

      (paises: IPaisAPI[]) => {
        this._paises = paises;
      },
      (error) => {
        this._hayError = true;
        this._paises = [];
      }
    );
  }

}
