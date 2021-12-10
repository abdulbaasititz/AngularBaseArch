import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterwindowComponent } from './masterwindow.component';
import { RolepermissionComponent } from '../rolepermission/rolepermission.component';
import { SettingsComponent } from '../settings/settings.component';
import { InvoiceComponent } from '../invoice/invoice.component';

const routes: Routes = [
  {
    path: '',
    component: MasterwindowComponent,
    data: {
      title: 'Master Window'
    }

  },
  {
    path: 'rolepermission',
    component:  RolepermissionComponent,
    data: {
      title: 'Master Window'
    }
  },
  {
    path: 'settings',
    component:  SettingsComponent,
    data: {
      title: 'Settings Window'
    }
  },
  {
    path: 'invoice',
    component:  InvoiceComponent,
    data: {
      title: 'Invoice Window'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterwindowRoutingModule { }
