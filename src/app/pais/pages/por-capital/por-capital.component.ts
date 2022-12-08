import { Component } from '@angular/core';
import { IPaisAPI } from '../../interfaces/IPaisApi';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  template: `
    <app-pais-buscador
      titleBuscador="Buscar por capital"
      descripBuscador="Realice una búsqueda por capital"
      (onEnter)="buscar( $event )">
    </app-pais-buscador>
    <div *ngIf="hayError" class="bg-red-600 lg:mx-auto font-bold p-2 rounded-md my-4">
      No se encontro nada con el término "{{termino}}"
    </div>
    <app-pais-tabla [paises]="paises" [hayError]="hayError"></app-pais-tabla>`,
})
export class PorCapitalComponent {
  public termino: string = '';
  private _hayError: boolean = false;
  private _paises: IPaisAPI[] = [];

  constructor (private paisService: PaisService) {}

  public get paises(): IPaisAPI[] {
    return this._paises;
  }

  public get hayError(): boolean {
    return this._hayError;
  }

  public buscar(termino: string): void {
    this._hayError = false;
    this.termino = termino;

    this.paisService.buscarPaisCapital(this.termino).subscribe(
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
