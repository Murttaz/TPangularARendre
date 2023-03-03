import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todos';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{

  public isUserSelected = false;
  selectedUser: any;
  todos: Todo[] = [];
  users$: any;

  constructor(private userService: UserService) {
    this.users$ = this.userService.getUsers();
  }

  ngOnInit(): void {
    this.userService.findAll().subscribe((users: User[]) => {
      this.users$ = users;
    });
  }
  onSelectedUser(user: any) {
    this.todos = user.todos.filter((todo: { done: any; }) => !todo.done);
  }

  onUserSelected(user: any) {
    this.selectedUser = user;
    this.isUserSelected = true;
  }

}