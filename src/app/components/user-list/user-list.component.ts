
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users$: BehaviorSubject<User[]> = this._userService.user$;
@Output() selectedUser = new EventEmitter<User>() 

selectUser(user: any) {
  this.selectedUser.emit(user);
}
constructor(private _userService : UserService){}

  ngOnInit(): void {
    this._userService.findAll().subscribe();
  }

}
