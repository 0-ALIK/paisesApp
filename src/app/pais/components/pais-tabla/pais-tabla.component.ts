import { Component, Input } from '@angular/core';
import { IPaisAPI } from '../../interfaces/IPaisApi';

@Component({
  selector: 'app-pais-tabla',
  template: `
    <div *ngIf="!hayError && paises.length !== 0" class="table text-slate-50 mx-auto w-full my-4">
      <div class="table-header-group bg-slate-800">
        <div class="table-row">
          <div class="md:table-cell hidden rounded-tl-lg py-4 pl-8 border-b">#</div>
          <div class="table-cell pl-4 border-b">Bandera</div>
          <div class="table-cell pl-4 border-b">Nombre</div>
          <div class="md:table-cell pl-4 border-b hidden">Población</div>
          <div class="table-cell pr-4 pl-4 border-b rounded-tr-lg">Más info..</div>
        </div>
      </div>
      <div class="table-row-group bg-slate-700">
        <div *ngFor="let pais of paises; let i = index" class="table-row">
          <div class="md:table-cell hidden border-b py-4 pl-8">{{i+1}}</div>
          <div class="table-cell border-b pl-4"><img src="{{pais.flag}}" class="w-10" alt="flank"></div>
          <div class="table-cell border-b pl-4">{{pais.name}}</div>
          <div class="md:table-cell border-b pl-4 hidden">{{pais.population | number}}</div>
          <div class="table-cell border-b pl-4"><a [routerLink]="['/pais', pais.alpha2Code]">Ver más</a></div>
        </div>
      </div>
    </div>`,
  styles: [
  ]
})
export class PaisTablaComponent {

  @Input()
  public hayError: boolean = false;

  @Input()
  public paises: IPaisAPI[] = [];

}
