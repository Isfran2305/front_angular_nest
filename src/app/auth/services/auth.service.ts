import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { register } from 'module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private baseUrl:"http://jsonplaceholder.typicode.com"
  private http=inject(HttpClient)

  constructor() {}
    loginConNest(credenciales: any){
      return this.http.get<any>(`${this.baseUrl}/todos}`);
    }

    registerConNest(datos: any){
      return this.http.post<any>(`${this.baseUrl}/register`,datos);
    }
  
}
