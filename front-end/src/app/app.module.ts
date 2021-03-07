import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexBodyComponent } from './index-body/index-body.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TccPageComponent } from './tcc-page/tcc-page.component';
import { TccsComponent } from './tccs/tccs.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditionComponent } from './user-edition/user-edition.component';
import { TccEditComponent } from './tcc-edit/tcc-edit.component';
import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './create-user/create-user.component'; 
import { MatSelectModule } from '@angular/material/select'; 
import { AuthInterceptor } from './auth.interceptor';
import { AuthServiceService } from './auth-service.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    IndexBodyComponent,
    TccPageComponent,
    TccsComponent,
    UserListComponent,
    UserEditionComponent,
    TccEditComponent,
    LoginComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSelectModule
  ],
  providers: [[AuthServiceService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
