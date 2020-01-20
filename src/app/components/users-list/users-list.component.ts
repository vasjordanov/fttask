import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  @Input()  usersList: User[];
  @Output() delete: EventEmitter<User>;
  @Output() update: EventEmitter<User>;

  constructor() {
    this.delete = new EventEmitter<User>();
    this.update = new EventEmitter<User>();
  }

  ngOnInit() {
  }

  onDeleteButtonClicked( user: User): void {
    this.delete.next(user);
  }

  updateToggleStatus(user: User): void {
    this.update.next(user);
  }
}
