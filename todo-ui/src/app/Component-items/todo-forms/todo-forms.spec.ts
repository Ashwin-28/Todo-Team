import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoForms } from './todo-forms';

describe('TodoForms', () => {
  let component: TodoForms;
  let fixture: ComponentFixture<TodoForms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoForms]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoForms);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
