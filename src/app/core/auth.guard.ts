import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map, mergeMap, tap } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  return inject(UserService).isConnected().pipe(
    map((response) => {
      if (response === 'ANONYMOUS') {
        console.log("is not connected")
        router.navigate(['']);
        return false;
      } else {
        console.log("is connected")
        return response
      }
    }),
    map((response) => {
      const requiredRoles = route.data['roles'];
      const hasRequiredRoles = requiredRoles.includes(response);
      if (!hasRequiredRoles) {
        console.log(`your role is ${response}: role-requirement not fullfilled`)
        router.navigate(['/not-authorized']);
        return false;
      } else {
        console.log(`your role is ${response}: you are authorized`)
        return true
      }
    })
  )
};
