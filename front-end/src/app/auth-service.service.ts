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

  login(id: string, chaveacesso: string){
    return this.http.post<any[]>('https://localhost:5001/api/login', {id, chaveacesso})
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
  }
}
