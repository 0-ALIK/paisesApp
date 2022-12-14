import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
    <h1 class="text-4xl font-bold">{{title}}</h1>
    <h2 class="text-lg mt-2">Busquedas</h2>
    <hr class="my-4">
    <ul class="flex sm:flex-col justify-around gap-2">
      <li routerLinkActive="app-list-item-active" [routerLinkActiveOptions]="{ exact: true }" routerLink="" class="app-list-item">Buscar país</li>
      <li routerLinkActive="app-list-item-active" routerLink="region" class="app-list-item">Por región</li>
      <li routerLinkActive="app-list-item-active" routerLink="capital" class="app-list-item">Por capital</li>
    </ul>`,
})
export class SidebarComponent {

  private _title: string = 'PaisesApp';



  public get title(): string {
    return this._title;
  }

}
