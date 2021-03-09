import { Component } from '@angular/core';
import { UsersService } from './users.service';
import { TccDataService } from './tcc-data.service';
import { AuthServiceService } from './auth-service.service';
import { HttpClient } from '@angular/common/http';

  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end';
  users = new UsersService().obtainUsers();
  tccs = new TccDataService().obtainTCCs();
  searchText: string = "";
  
  constructor(private authService: AuthServiceService){

  }

  obterStyle() : string {
    if (localStorage.getItem("userid") != null) {
      return "";
    } else {
      return "display: none;";
    }
  }

  estaLogado() : boolean {
    if (localStorage.getItem("userid") != null) {
      return true;
    } else {
      return false;
    }
  }

  currentUserID() {
    return localStorage.getItem("userid");
  }

  isAdmin() : boolean {
    console.log(localStorage.getItem("user_type"));
    return localStorage.getItem("user_type") == 'ADMIN';
  }
  
  logout(): void {
    console.log("Logout");
    this.authService.logout();
  }
}
