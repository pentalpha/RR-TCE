import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoremIpsum } from "lorem-ipsum";
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

export class TCC {
  id: number;
  title: string;
  author_id: number;
  professor_id: number;
  approved: boolean;
  keywords: string[];
  abstract: string;
  date: Date;
  fileID: number;

  constructor(){
    this.title = "";
    this.approved = false;
    this.keywords = [''];
    this.abstract = "";
    this.date = new Date();
    this.fileID = -1;
  }
}

@Injectable({
  providedIn: 'root'
})
export class TccDataService {
  private tccs: TCC[] = new Array();
  
  Url = 'http://localhost:5000/api/tcc';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  obtainTccs(){
    return this.http.get<any[]>(`${this.Url}`);
  }

  updateTcc(tcc: TCC) {
    return this.http.put<any>(this.Url, JSON.stringify(tcc), this.httpOptions)
  }

  addTcc(tcc: TCC) {
    return this.http.post<any>(this.Url, JSON.stringify(tcc), this.httpOptions)
  }

  deleteTcc(id: Number) {
    return this.http.delete<any>(this.Url + '/' + id, this.httpOptions)
  }

  obtainTCCsByProfessor(prof_id: Number) {
    return this.http.delete<any>(this.Url + '/professorId' + prof_id, this.httpOptions)
  }
}
