import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UsersService } from './users.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) {

  }

  login(username: string, passwd: string){
    return this.http.post<any[]>('http://localhost:5000/api/usuario/login', {username, passwd})
      .pipe(
        tap(response => this.setSession(response, username))
      );
  }

  private setSession(authResult, username){
    localStorage.setItem('token', authResult.accessToken);
    localStorage.setItem('expires_at', authResult.expiration);
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }
}
