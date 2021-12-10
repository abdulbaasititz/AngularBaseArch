import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablebuilderComponent } from './tablebuilder.component';

const routes: Routes = [{
  path: '',
  component: TablebuilderComponent,
  data: {
    title: 'Table Builder'
  },
   
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablebuilderRoutingModule { }
