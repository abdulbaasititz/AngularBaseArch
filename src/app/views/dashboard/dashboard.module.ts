import { NgModule, InjectionToken, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormComponent } from '../../containers/form/form.component';
import { DatatableComponent } from '../../containers/datatable/datatable.component';
import { PrimengcompModule } from '../../primengcomp/primengcomp.module';
import { RolepermissionComponent } from '../rolepermission/rolepermission.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ChartsModule } from 'ng2-charts';
import { SortablejsModule } from 'ngx-sortablejs';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { BaseDashboardComponent } from '../../containers/base-dashboard/base-dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent, 
    FormComponent,
    DatatableComponent,
    RolepermissionComponent,
    BaseDashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengcompModule,
    NgxFileDropModule,
    ChartsModule,
    SortablejsModule
  ],
  providers: [
  ]
})
export class DashboardModule {
  static injector: Injector;
  constructor(injector: Injector) {
    DashboardModule.injector = injector;
  }
}
