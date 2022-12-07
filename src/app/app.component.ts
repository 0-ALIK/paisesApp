import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
    <p>{{title}}</p>`,
})
export class AppComponent {
  title = 'paisesApp';
}
