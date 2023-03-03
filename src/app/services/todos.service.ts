import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { Todo } from '../models/todos';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  getTodos() {
    throw new Error('Method not implemented.');
  }
  
  private _baseUrl = 'http://localhost:3000/todo';
  
  public todos$ = new BehaviorSubject<Todo[]>([]);

  constructor(private _http: HttpClient) {}
  
  findAll(): Observable<Todo[]> {
    return this._http
      .get<Todo[]>(this._baseUrl)
      .pipe(
        tap(todos => this.todos$.next(todos)),
        catchError(error=>{
          console.error("une erreur est survenue en cherchant les todos",error);
          return of([])
        })
      );
  }

  findById(id: number): Observable<Todo> {
    return this._http.get<Todo>(`${this._baseUrl}/${id}`);
  }

  findOne(id: number): Observable<Todo> {
    return this._http.get<Todo>(`${this._baseUrl}/${id}`);
  }
  createOne(todo: Todo): Observable<Todo> {
    return this._http.post<Todo>(`${this._baseUrl}`, todo);
  }

  editOne(todo: Todo): Observable<Todo> {
    return this._http.put<Todo>(`${this._baseUrl}/${todo.id}`, todo);
  }

  deleteOne(id: number): Observable<Todo> {
    return this._http.delete<Todo>(`${this._baseUrl}/${id}`);
  }
}
