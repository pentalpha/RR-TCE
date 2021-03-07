import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TCC, TccDataService } from '../tcc-data.service';
import { User, UsersService } from '../users.service';

@Component({
  selector: 'app-user-edition',
  templateUrl: './user-edition.component.html',
  styleUrls: ['./user-edition.component.css']
})
export class UserEditionComponent implements OnInit {
  current_id: number;
  current_user: User;
  user_tcc_id: number;
  prof_tccs: TCC[];

  error_str: string = "";
  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private tccService: TccDataService,
    public userService: UsersService) {
      this.route.params.subscribe(res => this.current_id = res.id);
      this.current_user = this.userService.obtainUser(Number(this.current_id));
      this.user_tcc_id = this.tccService.getTccIDbyAuthor(this.current_user.id);

      if (this.current_user.user_type == "PROFESSOR"){
        this.update_prof_tccs();
      }
  }

  update_prof_tccs(){
    this.prof_tccs = this.tccService.obtainTCCsByProfessor(this.current_user.id);
  }

  updateTccStatus(tcc_id: number, new_status: boolean){
    for (let tcc of this.prof_tccs){
      if (tcc_id == tcc.id){
        tcc.approved = new_status;
        this.tccService.updateTCC(tcc);
      }
    }
    this.update_prof_tccs();
  }

  ngOnInit(): void {
  }

  updateUser() {
    let error_list: string[] = new Array();
    let valid_mail = (this.current_user.email.includes('@') && this.current_user.email.length >= 6);
    if (!valid_mail){
      error_list.push("E-mail inválido")
    }
    let valid_name = (this.current_user.name.length >= 3);
    if (!valid_name){
      error_list.push("Nome é curto demais.")
    }
    let valid_passwd = (this.current_user.passwd.length >= 4);
    if (!valid_passwd){
      error_list.push("Senha curta demais. Mínimo de 4 caracteres.")
    }
    if (valid_mail && valid_name && valid_passwd)
    {
      this.userService.updateUser(this.current_user);
      this.error_str = "Usuário atualizado com sucesso!";
    }
    else
    {
      this.error_str = error_list.join('; ');
    }
  }

  getAuthor(author_id: number): string{
    return this.userService.obtainUser(author_id).name
  }
}
