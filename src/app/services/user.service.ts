import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { UserRole } from '../models/userRole.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private role: UserRole = 'USER'

  getData(): Observable<UserRole> {
    console.log("fetching user data")
    return of(this.role).pipe(delay(3000))
  }
}
