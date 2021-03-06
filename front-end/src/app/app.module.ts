import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexBodyComponent } from './index-body/index-body.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { TccPageComponent } from './tcc-page/tcc-page.component';
import { TccsComponent } from './tccs/tccs.component'; 

@NgModule({
  declarations: [
    AppComponent,
    IndexBodyComponent,
    TccPageComponent,
    TccsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
