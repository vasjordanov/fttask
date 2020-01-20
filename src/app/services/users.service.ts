import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getData(): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:3000/users');
  }

  deleteUser(id: string): Observable<void> {
    return this.httpClient.delete<void>('http://localhost:3000/users/' + id);
  }

  updateUser(user): Observable<void> {
    return this.httpClient.put<void>('http://localhost:3000/users/' + user.id, user);
  }

  createUser(user: User): Observable<void> {
    user.id = this.createUUID();

    return this.httpClient.post<void>('http://localhost:3000/users', user);
  }

  private createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
       let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
       return v.toString(16);
    });
 }
}
