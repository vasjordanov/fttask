import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { User } from './models/user.model';
import { UsersService } from './services/users.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  users$: Observable<User[]>;
  roles: string[];

  private subscription: Subscription;
  constructor(public usersService: UsersService, private changeDetectorRef: ChangeDetectorRef) {
    this.subscription = new Subscription();

    this.roles = ['User', 'Admin'];
  }

  ngOnInit(): void {
    this.users$ = this.usersService.getData();
  }

  onUserUpdate(user): void {
    user.isToggled = !user.isToggled;
    this.subscription.add(this.usersService.updateUser(user).subscribe(() => {
      alert('User has been updated succesfully');
    }, (errorResponse: HttpErrorResponse) => {
      console.log(errorResponse.message);
    }, () => {
      this.users$ = this.usersService.getData();

      this.changeDetectorRef.detectChanges();
    }));
  }

  onInvitationButtonClicked(user): void {
    this.subscription.add(this.usersService.createUser(user).subscribe(() => {
      alert('User has been created succesfully');
    }, (errorResponse: HttpErrorResponse) => {
      console.log(errorResponse.message);
    }, () => {
      this.users$ = this.usersService.getData();

      this.changeDetectorRef.detectChanges();
    }));
  }

  onDeleteUserButtonClicked(user): void {
    this.subscription.add(this.usersService.deleteUser(user.id).subscribe(() => {
      alert('User has been deleted succesfully');
    }, (errorResponse: HttpErrorResponse) => {
      console.log(errorResponse.message);
    }, () => {
      this.users$ = this.usersService.getData();

      this.changeDetectorRef.detectChanges();
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
