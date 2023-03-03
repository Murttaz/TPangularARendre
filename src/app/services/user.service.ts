import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable,tap } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  private _baseUrl = 'http://localhost:3000/user/';
  public user$= new BehaviorSubject<User[]>([])

  constructor(private _http: HttpClient) { }
  findAll(): Observable<User[]>{
    return this._http
      .get<User[]>(this._baseUrl)
      .pipe(tap(users => this. user$.next(users)),
      );
  }
  getUsers():  Observable<User[]> {
    return this.user$;
  }
}