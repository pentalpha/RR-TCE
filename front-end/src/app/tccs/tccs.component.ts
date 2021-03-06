import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TCC, TccDataService } from '../tcc-data.service';
import { User, UsersService } from '../users.service';

@Component({
  selector: 'app-tccs',
  templateUrl: './tccs.component.html',
  styleUrls: ['./tccs.component.css']
})
export class TccsComponent implements OnInit {
  query: string;
  resultTCCs: TCC[] = [];
  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private tccService: TccDataService,
    private userService: UsersService) {
      this.query = '';
      if (this.route.snapshot.queryParams['query']) {
        this.route.params.subscribe(res => this.query = res.query);
      }

      this.resultTCCs = this.tccService.searchTCCs(this.query);
      this.resultTCCs.sort((a, b) => b.date.getTime()-a.date.getTime());
  }

  ngOnInit(): void {
  }


  getAuthor(author_id: number): string{
    return this.userService.obtainUser(author_id).name
  }
}
