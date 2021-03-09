import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UsersService } from './users.service';
import { tap } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) {

  }

  login(email: string, passwd: string){
    return this.http.post<any[]>('http://localhost:5000/api/usuario/login', {email, passwd})
      .pipe(
        tap(response => this.setSession(response))
      );
  }

  private setSession(authResult){
    localStorage.setItem('token', authResult.accessToken);
    localStorage.setItem('expires_at', authResult.expiration);
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('userid');
    localStorage.removeItem('user_type');
  }

  isLoggedIn() {
      return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  getExpiration() {
      const expiration = localStorage.getItem("expires_at");
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
  }
}
