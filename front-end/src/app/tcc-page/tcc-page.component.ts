import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TCC, TccDataService } from '../tcc-data.service';
import { User, UsersService } from '../users.service';
@Component({
  selector: 'app-tcc-page',
  templateUrl: './tcc-page.component.html',
  styleUrls: ['./tcc-page.component.css']
})
export class TccPageComponent implements OnInit {
  current_id: string;
  current_tcc: TCC;
  author: string;
  professor: string;
  approved: string;
  keyword_str: string;

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private tccService: TccDataService,
    private userService: UsersService) {
      this.current_id = 'No ID';
      this.route.params.subscribe(res => this.current_id = res.id);
      this.current_tcc = tccService.obtainTCC(Number(this.current_id));
      this.author = this.userService.obtainUser(this.current_tcc.author_id).name;
      this.professor = this.userService.obtainUser(this.current_tcc.professor_id).name;
      if (this.current_tcc.approved){
        this.approved = "Sim"
      }else{
        this.approved = "Não"
      }
      this.keyword_str = this.current_tcc.keywords.join(", ");
    }

  ngOnInit(): void {
  }

  getFile(fileID: Number): string{
    return "";
  }

}
