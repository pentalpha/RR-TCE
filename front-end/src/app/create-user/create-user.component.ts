import { Component, OnInit } from '@angular/core';
import { User, UsersService } from '../users.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  email: string;
  name: string;
  passwd: string;
  error_str: string = "";
  authorSelectValue: string = "STUDENT";

  constructor(private userService: UsersService,
    private router: Router) { }

  ngOnInit(): void {
  }

  createUser(){
    let error_list: string[] = new Array();
    let valid_mail = (this.email.includes('@') && this.email.length >= 6)
    let unused_mail = !this.userService.emailIsUsed(this.email);
    if (!valid_mail){
      error_list.push("E-mail inválido");
    }
    if(!unused_mail){
      error_list.push("E-mail já utilizado");
    }
    let valid_name = (this.name.length >= 3);
    if (!valid_name){
      error_list.push("Nome é curto demais.");
    }
    let valid_passwd = (this.passwd.length >= 4);
    if (!valid_passwd){
      error_list.push("Senha curta demais. Mínimo de 4 caracteres.");
    }
    if (valid_mail && valid_name && valid_passwd && unused_mail)
    {
      let new_user: User = new User();
      new_user.id = -1;
      new_user.email = this.email;
      new_user.name = this.name;
      new_user.passwd = this.passwd;
      new_user.user_type = this.authorSelectValue;
      this.userService.updateUser(new_user);
      this.error_str = "Usuário criado com sucesso!";
      this.router.navigateByUrl('/login');
    }
    else
    {
      this.error_str = error_list.join('; ');
    }
  }

}
