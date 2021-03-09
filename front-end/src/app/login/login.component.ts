import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private router: Router,
    private http: HttpClient) {

  }
  
  login(){
    console.log(this.loginForm.controls.id.value);
    console.log(this.loginForm.controls.chave.value);

    this.authService.login(this.loginForm.controls.id.value, this.loginForm.controls.chave.value)
      .subscribe(
        (answer) => {
          console.log(answer);
          localStorage.setItem('userid', answer['user']['id'])
          localStorage.setItem('user_type', answer['user']['usertype'])
          this.router.navigateByUrl('/');
        }
      );
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      id: [],
      chave: ['']
    });
  }

}
