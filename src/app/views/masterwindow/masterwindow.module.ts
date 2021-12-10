import { NgModule, InjectionToken, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormComponent } from '../../containers/form/form.component';
import { DatatableComponent } from '../../containers/datatable/datatable.component';
import { PrimengcompModule } from '../../primengcomp/primengcomp.module';
import { MasterwindowRoutingModule } from './masterwindow-routing.module';
import { MasterwindowComponent } from './masterwindow.component';
import { RolepermissionComponent } from '../rolepermission/rolepermission.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ChartsModule } from 'ng2-charts';
import { SortablejsModule } from 'ngx-sortablejs';
import { SettingsComponent } from '../settings/settings.component';

@NgModule({
  declarations: [
    MasterwindowComponent,
    FormComponent,
    DatatableComponent,
    RolepermissionComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    MasterwindowRoutingModule,
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
export class MasterwindowModule {
  static injector: Injector;
  constructor(injector: Injector) {
    MasterwindowModule.injector = injector;
  }
}
