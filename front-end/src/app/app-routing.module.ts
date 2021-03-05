import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexBodyComponent } from './index-body/index-body.component'

const routes: Routes = [{
  path: '',
  component: IndexBodyComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
