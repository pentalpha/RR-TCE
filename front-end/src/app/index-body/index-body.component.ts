import { Component, OnInit } from '@angular/core';
import {TCC, TccDataService} from '../tcc-data.service';


@Component({
  selector: 'app-index-body',
  templateUrl: './index-body.component.html',
  styleUrls: ['./index-body.component.css']
})
export class IndexBodyComponent implements OnInit {
  
  lastTCCs: TCC[] = [];
  constructor(private tccService: TccDataService,
    ) {
    let tccs = this.tccService.obtainTCCs();
    tccs.sort((a, b) => b.date.getTime()-a.date.getTime())
    this.lastTCCs = tccs.slice(0, 3);
  }

  ngOnInit(): void {
  }
  
}
