import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPaisAPI } from '../interfaces/IPaisApi';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.com/v2';


  constructor (private http: HttpClient) {}


  public buscarPais (query: string): Observable<IPaisAPI[]> {

    const url: string = `${this.apiUrl}/name/${query}`;
    return this.http.get<IPaisAPI[]>(url);
  }

}
