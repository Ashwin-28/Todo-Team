import { Component,OnInit } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { TodoServices } from '../../Service/todo-services';
import { Todo } from '../../Model/Todo-models';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList implements OnInit {
   filter: 'all' | 'active' | 'completed' = 'all';

  todos$!: Observable<Todo[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string>;
  filteredTodos$!: Observable<Todo[]>;

  constructor(private service: TodoServices) {}

  ngOnInit(): void {
    this.todos$ = this.service.todos$;
    this.loading$ = this.service.loading$;
    this.error$ = this.service.error$;

    this.filteredTodos$ = combineLatest([this.todos$]).pipe(
      map(([todos]) => {
        if (this.filter === 'active') return todos.filter(t => !t.completed);
        if (this.filter === 'completed') return todos.filter(t => t.completed);
        return todos;
      })
    );

    this.service.loadTodos();
  }

  setFilter(f: any) {
    this.filter = f;
    this.service.loadTodos();
  }

  toggle(todo: Todo) {
    todo.completed = !todo.completed;
    this.service.updateTodo(todo).subscribe();
  }

  delete(id: number) {
    this.service.deleteTodo(id).subscribe();
  }
}
