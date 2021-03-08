import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TCC, TccDataService } from '../tcc-data.service';
import { User, UsersService } from '../users.service';
import { FileEntry, FileService} from "../file.service";
import { HttpEventType, HttpResponse } from '@angular/common/http';


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

  selectedFile: File;
  error_str: string = "";
  upload_msg: string = "";
  new_fileid: number = -2;
  error_list: string[] = new Array();
  valid_keywords: boolean;
  valid_title: boolean;
  valid_abs: boolean;

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private tccService: TccDataService,
    public userService: UsersService,
    private fileService: FileService) {
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
    this.error_list = new Array();
    this.current_tcc.author_id = this.authorSelectValue;
    this.current_tcc.professor_id = this.professorSelectValue;
    
    this.valid_keywords = (this.keywordsStr.length > 0);
    if (!this.valid_keywords){
      this.error_list.push("Insira palavras-chave");
      console.log("Insira palavras-chave");
    }else{
      this.current_tcc.keywords = this.keywordsStr.split(";");
    }

    this.valid_title = (this.current_tcc.title.length >= 10);
    if (!this.valid_title){
      this.error_list.push("Títulos devem ter pelo menos 10 caracteres");
      console.log("Títulos devem ter pelo menos 10 caracteres");
    }

    this.valid_abs = (this.current_tcc.abstract.length > 100);
    if (!this.valid_abs){
      this.error_list.push("Resumos devem ter mais de 100 caracteres");
    }

    
    let callback = (success) => {
      if (!success){
        console.log(this.upload_msg);
        this.error_list.push("Erro no upload do documento de TCC: " + this.upload_msg);
      }
  
      if (this.valid_keywords && this.valid_title && this.valid_abs && success)
      {
        this.current_id = this.tccService.updateTCC(this.current_tcc);
        console.log("updated tcc")
        this.router.navigate(['tcc', this.current_id]);
      }
      else
      {
        this.error_str = this.error_list.join('; ');
      }
    }

    if (this.valid_keywords && this.valid_title && this.valid_abs && this.selectedFile){
      this.upload(callback);
    }else{
      callback(true);
    }
  }

  upload(callback_func) {
    if (this.selectedFile) {
      this.fileService.upload(this.selectedFile, this.current_tcc.author_id).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
          } else if (event instanceof HttpResponse) {
            console.log(event.body.message + " " + event.body.newid);
            this.current_tcc.fileID = Number(event.body.newid);
            callback_func(true);
          }
        },
        (err: any) => {
          console.log(err);

          if (err.error && err.error.message) {
            this.upload_msg = err.error.message;
          } else {
            this.upload_msg = 'Could not upload the file!';
          }

          this.new_fileid = -1;
          callback_func(false);
        });
    }
  }

  selectFile(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  getFile(): string{
    return this.fileService.getDownloadLink(this.current_tcc.fileID);
  }
}
