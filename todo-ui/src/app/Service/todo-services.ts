import { Injectable } from '@angular/core';
import { Todo } from '../Model/Todo-models';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoServices {


  private apiUrl = '';

  private todosSubject = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todosSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private errorSubject = new BehaviorSubject<string>('');
  error$ = this.errorSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadTodos() {
    this.loadingSubject.next(true);

    this.http.get<Todo[]>(this.apiUrl).pipe(
      tap(res => this.todosSubject.next(res)),
      catchError(err => {
        this.errorSubject.next('Error loading todos');
        return throwError(() => err);
      })
    ).subscribe(() => this.loadingSubject.next(false));
  }

  addTodo(todo: Todo) {
    return this.http.post(this.apiUrl, todo).pipe(
      tap(() => this.loadTodos())
    );
  }

  updateTodo(todo: Todo) {
    return this.http.put(`${this.apiUrl}/${todo.id}`, todo).pipe(
      tap(() => this.loadTodos())
    );
  }

  deleteTodo(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadTodos())
    );
  }
  
}
