import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FormbuilderRoutingModule } from './formbuilder-routing.module';
import {FormbuilderComponent} from './formbuilder.component';
import { FormComponent } from '../../containers/form/form.component';
import {PrimengcompModule} from '../../primengcomp/primengcomp.module';


@NgModule({
  declarations: [FormbuilderComponent, FormComponent],
  imports: [
    CommonModule,
    FormbuilderRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    PrimengcompModule,
  ]
})
export class FormbuilderModule { }
