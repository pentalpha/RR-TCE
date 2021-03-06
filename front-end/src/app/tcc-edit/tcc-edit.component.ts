import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TCC, TccDataService } from '../tcc-data.service';
import { User, UsersService } from '../users.service';
@Component({
  selector: 'app-tcc-edit',
  templateUrl: './tcc-edit.component.html',
  styleUrls: ['./tcc-edit.component.css']
})
export class TccEditComponent implements OnInit {
  current_id: number;
  current_tcc: TCC;
  keywordsStr: string;
  studentList: User[];
  authorSelectValue: number;
  professorSelectValue: number;
  professorList: User[];

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private tccService: TccDataService,
    public userService: UsersService) {
      this.route.params.subscribe(res => this.current_id = res.id);
      if (this.current_id < 0){
        let author_param: number;
        this.route.params.subscribe(res => author_param = res.author);
        this.current_tcc = new TCC();
        this.current_tcc.author_id = author_param;
      }else{
        this.current_tcc = this.tccService.obtainTCC(Number(this.current_id));
      }
      this.keywordsStr = this.current_tcc.keywords.join(";")
      this.studentList = this.userService.obtainUsersOfType("STUDENT");
      this.authorSelectValue = this.current_tcc.author_id;
      this.professorList = this.userService.obtainUsersOfType("PROFESSOR");
      this.professorSelectValue = this.current_tcc.professor_id;
    }

  ngOnInit(): void {
  }

  updateTCC(): void{
    this.current_tcc.author_id = this.authorSelectValue;
    this.current_tcc.professor_id = this.professorSelectValue;
    this.current_tcc.keywords = this.keywordsStr.split(";");

    this.current_id = this.tccService.updateTCC(this.current_tcc);

    this.router.navigate(['tcc', this.current_id])
  }
}
