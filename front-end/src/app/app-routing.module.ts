import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexBodyComponent } from './index-body/index-body.component'
import { TccPageComponent } from './tcc-page/tcc-page.component'
import { TccsComponent } from './tccs/tccs.component'
const routes: Routes = [{
  path: '',
    component: IndexBodyComponent
  },
  {path: 'tcc/:id',
    component: TccPageComponent
  },
  {path: 'tccs',
    component: TccsComponent},
  {path: 'tccs/:query',
    component: TccsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
