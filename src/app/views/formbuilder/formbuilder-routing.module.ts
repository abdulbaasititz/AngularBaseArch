import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormbuilderComponent} from './formbuilder.component';
const routes: Routes = [
  {
    path: '',
    component: FormbuilderComponent,
    data: {
      title: 'Form Builder'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormbuilderRoutingModule { }
