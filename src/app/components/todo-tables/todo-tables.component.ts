import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todos.service';
import { Todo } from '../../models/todos';

@Component({
  selector: 'app-todo-tables',
  templateUrl: './todo-tables.component.html',
  styleUrls: ['./todo-tables.component.css']
})
export class TodoTablesComponent implements OnInit  {
  todos: Todo[] = [];
  doneTodos: Todo[] = [];
  notDoneTodos: Todo[] = [];
  id!:number;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.findAll().subscribe((todos: Todo[]) => {
      this.todos = todos;
      this.doneTodos = todos.filter((todo) => todo.done);
      this.notDoneTodos = todos.filter((todo) => !todo.done);
    });
  }

  validate(todo: Todo): void {
    todo.done = true;
    this.todoService.editOne(todo).subscribe(() => {
      this.doneTodos.push(todo);
      this.notDoneTodos = this.notDoneTodos.filter((t: Todo) => t.id !== todo.id);
    });
  }

  deleteTodo(id: number): void {
    if (id !== undefined) {
      this.todoService.deleteOne(id).subscribe(() => {
        this.todos = this.todos.filter((todo) => todo.id !== id);
        this.notDoneTodos = this.notDoneTodos.filter((todo) => todo.id !== id);
        this.doneTodos = this.doneTodos.filter((todo) => todo.id !== id);
      });
    }
  }

  delete(todo: Todo): void {
    if (todo.id !== undefined) {
      this.todoService.deleteOne(todo.id).subscribe(() => {
        this.todos = this.todos.filter((t) => t.id !== todo.id);
        this.notDoneTodos = this.notDoneTodos.filter((t) => t.id !== todo.id);
        this.doneTodos = this.doneTodos.filter((t) => t.id !== todo.id);
      });
    }
  }
  }
