import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
  })
export class Authservice {
namePerso!:string;
password!:string;
isValid:boolean=false;
userConnected!:User;


private _baseUrl = 'http://localhost:3000/user';

constructor(private http:HttpClient){}

  isUserValid(namePerso: string, password: string):Promise<boolean> {
    return this.http.get<any>(`${this._baseUrl}/`).toPromise().then(  response => {

      const user = response.find((u: { namePerso: string; password: string; }) => u.namePerso === namePerso && u.password === password);
      this.isValid= user !== undefined;
      this.userConnected=user;
      return this.isValid;
    })
    ;
  }
}
