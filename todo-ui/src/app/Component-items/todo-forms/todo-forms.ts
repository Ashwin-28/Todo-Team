import { Component,OnInit } from '@angular/core';
import { FormBuilder, Validators,ReactiveFormsModule } from '@angular/forms';
import { TodoServices } from '../../Service/todo-services';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-todo-forms',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './todo-forms.html',
  styleUrl: './todo-forms.css',
})
export class TodoForms implements OnInit {

   form!: FormGroup;

  constructor(private fb: FormBuilder, private service: TodoServices) {}

 ngOnInit(): void {
     this.form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]]
  });
 }

  submit() {
    if (this.form.invalid) return;

    this.service.addTodo({
      title: this.form.value.title!,
      completed: false
    }).subscribe(() => {
      this.form.reset();
    });
  }

}
