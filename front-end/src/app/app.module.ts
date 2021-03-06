import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
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
    AppRoutingModule,
    FormsModule,
    MatToolbarModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
