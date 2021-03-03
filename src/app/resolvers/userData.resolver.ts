import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
providedIn: 'root'
})
export class UserDataResolver {
constructor(private authService: AuthService) {}

resolve() {
console.log('Hello');
return this.authService.getUserData();
}
// resolveWelcome() {
//     console.log('Welcome');
//     return this.authService.getWelcomeData();
//     }
}
