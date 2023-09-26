import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DummyApiServiceService {

  apiURL="https://jsonplaceholder.typicode.com/";

  constructor(private http: HttpClient) { }

  /* GET */
  getUsuarios():Observable<any>{
    return this.http.get(this.apiURL+"users/").pipe(retry(3));
  }
}
