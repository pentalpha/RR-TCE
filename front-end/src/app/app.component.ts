import { Component } from '@angular/core';
import { UsersService } from './users.service';
import { TccDataService } from './tcc-data.service';

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
  
  searchTCCs(){

  }
  
}
