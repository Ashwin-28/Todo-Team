import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { TodoForms } from './Component-items/todo-forms/todo-forms';
import { TodoList } from './Component-items/todo-list/todo-list';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ReactiveFormsModule,HttpClientModule,TodoForms,TodoList],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todo-ui');
}
