import { Injectable } from '@angular/core';

interface User {
  username: string;
  password: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    { username: 'admin', password: 'admin', isAdmin: true }
  ];

  currentUser: User | null = null;

  
  get loggedIn(): boolean {
    return this.currentUser !== null;
  }

  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    
    if (user) {
      this.currentUser = user;
      return true;
    }
    return false;
  }

  logout() {
    this.currentUser = null;
  }

  isAdmin(): Promise<boolean> {
    return Promise.resolve(this.currentUser?.isAdmin === true);
  }

  constructor() { }
}
