import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-pais',
  template: `
    <p>
      ver-pais works!
    </p>
  `,
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  constructor (private activateRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe(
      params => {
        console.log(params);
      }

    );
  }

}
