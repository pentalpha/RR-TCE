import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexBodyComponent } from './index-body/index-body.component'
import { TccPageComponent } from './tcc-page/tcc-page.component'
import { TccEditComponent } from './tcc-edit/tcc-edit.component'
import { TccsComponent } from './tccs/tccs.component'
import { UserListComponent } from './user-list/user-list.component'
import { UserEditionComponent } from './user-edition/user-edition.component'
import { LoginComponent } from "./login/login.component"
import { CreateUserComponent } from "./create-user/create-user.component"

const routes: Routes = [{
  path: '',
    component: IndexBodyComponent
  },
  {path: 'login',
    component: LoginComponent},
  {path: 'createuser',
    component: CreateUserComponent},
  {path: 'tcc/:id',
    component: TccPageComponent
  },
  {path: 'tccedit/:id',
    component: TccEditComponent
  },
  {path: 'tccedit/:id/:author',
    component: TccEditComponent},
  {path: 'tccs',
    component: TccsComponent},
  {path: 'tccs/:query',
    component: TccsComponent},
  {path: 'users',
    component: UserListComponent},
  {path: 'user/:id',
    component: UserEditionComponent,
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
