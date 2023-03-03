import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo } from 'src/app/models/todos';
import { TodoService } from 'src/app/services/todos.service';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent  implements OnInit{

  todos: Todo[] = [];
  toCreate : Todo={
    userId: undefined,
    _isEditable: true,
    done: false
  };
  selectedUserId!: number;

  private _subscription?: Subscription;
 

  constructor(private _todoService: TodoService) {}
  
  ngOnInit() {
    this._todoService.findAll().subscribe();
    
  }

  ngOnDestroy() {
      this._subscription?.unsubscribe();
  }

  changeStateOfTodo(todo: Todo) {
    todo.done = !todo.done;
    this._todoService.editOne(todo).subscribe();
  }

  createTodo() {
    if (this.toCreate.text) {
      this.toCreate.userId=this.selectedUserId
      this._todoService
        .createOne(this.toCreate)
        .subscribe(() => {
          this.toCreate.text = '';
        });
    }
  }

  editTodo(todo: Todo) {
    todo._isEditable = !todo._isEditable;
    if (!todo._isEditable) {
      this._todoService
        .editOne(todo)
        .subscribe((updated) => {
          const index = this.todos.findIndex(t => t.id == updated.id);
          this.todos.splice(index, 1, updated);
        });
    }
  }

  onDelete(id: number) {
    if (id) {
      this._todoService
      .deleteOne(id)
      .subscribe();
    }
  }
}

