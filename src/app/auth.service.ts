import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor() {
    const storedData = localStorage.getItem('data');
    if (storedData) {
      this.setToken(storedData);
    }
  }

  getToken(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  setToken(data: any): void {
    localStorage.setItem('data', data);
    this.tokenSubject.next(data);
  }

  removeToken(): void {
    localStorage.removeItem('data');
    this.tokenSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  // isTokenExpired(): boolean {
  //   const token = this.getToken();
  //   if (token) {
  //     let expired = false;
  //     token.subscribe(tokenValue => {
  //       if (tokenValue) {
  //         const tokenParts = tokenValue.split('.');
  //         if (tokenParts.length >= 2) {
  //           try {
  //             const payload = JSON.parse(atob(tokenParts[1]));
  //             console.log('payload', payload)
  //             if (payload && payload.exp) {
  //               const currentTime = Math.floor(Date.now() / 1000);
  //               if (currentTime > payload.exp) {
  //                 this.removeToken();
  //                 expired = true;
  //               }
  //             }
  //           } catch (error) {
  //             console.error('Error parsing token payload:', error);
  //           }
  //         } else {
  //           console.error('Invalid token structure:', tokenValue);
  //         }
  //       }
  //     });
  //     return expired;
  //   }
  //   return false; // Return false if token is not available
  // }

  logout(): void {
    this.removeToken();
    localStorage.removeItem('currentPage');
    window.location.reload();
  }
}
