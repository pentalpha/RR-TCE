import { Component, OnInit } from '@angular/core';
import { User, UsersService } from '../users.service';
import { TCC, TccDataService } from '../tcc-data.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  userList: User[];
  constructor(private userService: UsersService,
    private tccService: TccDataService) {
      this.updateUsers()
  }

  ngOnInit(): void {
  }

  updateUsers() {
    this.userList = this.userService.obtainUsers();
  }

  deleteUser(user_id: number){
    this.userService.deleteUser(user_id);
    this.tccService.deleteTCCbyAuthor(user_id);
    this.updateUsers();
  }

}
