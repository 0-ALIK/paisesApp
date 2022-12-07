import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <section class="bg-slate-900 min-h-screen min-w-full">

      <section class="container mx-auto min-h-screen pt-2 px-4 grid gap-2 grid-cols-5">

        <app-sidebar class="col-span-2 md:col-span-1 text-slate-50"></app-sidebar>


        <article class="col-span-3 md:col-span-4 text-slate-50">
          <router-outlet></router-outlet>
        </article>

      </section>


    </section>`,
})
export class AppComponent {
  title = 'paisesApp';
}
