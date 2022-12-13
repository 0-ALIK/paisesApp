import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { IPaisAPI } from '../../interfaces/IPaisApi';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  template: `
    <h1 class="text-4xl font-bold">{{pais?.name || 'Error 404'}}</h1>
    <h2 class="text-lg mt-2">{{pais?.capital || 'País no encontrado'}}</h2>
    <hr class="my-4">

    <section class="flex lg:flex-row flex-col justify-around items-center gap-4" *ngIf="pais">
      <div class="lg:w-1/2 w-full p-2 bg-slate-800 rounded-md">
        <img src="{{pais.flag}}" alt="pais">
      </div>
      <ul class="bg-slate-800  lg:w-1/2 rounded-md px-4 py-2 w-full">
        <li class="my-2 border-b-2 ">Población: {{pais.population | number}}</li>
        <li class="my-2 border-b-2 ">Capital: {{pais.capital}}</li>
        <li class="my-2 border-b-2 ">Región: {{pais.region}}</li>
        <li class="my-2 border-b-2 ">Subregión: {{pais.subregion}}</li>
      </ul>
    </section>
    <section  *ngIf="pais">
      <h2>Traducciones</h2>
      <div class="flex gap-2 flex-wrap">
        <span class="py-1 px-2 bg-sky-500 rounded-md">{{pais.translations.ja}}</span>
        <span class="py-1 px-2 bg-sky-500 rounded-md">{{pais.translations.br}}</span>
        <span class="py-1 px-2 bg-sky-500 rounded-md">{{pais.translations.fa}}</span>
        <span class="py-1 px-2 bg-sky-500 rounded-md">{{pais.translations.it}}</span>
      </div>
    </section>`,
})
export class VerPaisComponent implements OnInit {

  private _pais: IPaisAPI | undefined;

  constructor (
    private activateRoute: ActivatedRoute,
    private paisService: PaisService
    ) {}

  ngOnInit(): void {

    this.activateRoute.params.subscribe(
      ({id}) => { //Obteniendolo por destruccturación

        this.paisService.getPaisById(id).subscribe(
          (pais: IPaisAPI) => {
            this._pais = pais;
          }
        );
      }
    );
  }

  /* ngOnInit(): void {

    this.activateRoute.params
      .pipe(
        switchMap( ({id}) => this.paisService.getPaisById( id ) ),
        tap( pais => console.log(pais) )
      )
      .subscribe(
        pais => {
          this._pais = pais;
        }
      );
  } */


  public get pais(): IPaisAPI | undefined {
    return this._pais;
  }
}
