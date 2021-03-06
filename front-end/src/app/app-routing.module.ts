import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexBodyComponent } from './index-body/index-body.component'
import { TccPageComponent } from './tcc-page/tcc-page.component'
const routes: Routes = [{
  path: '',
    component: IndexBodyComponent
  },
  {path: 'tcc/:id',
    component: TccPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
