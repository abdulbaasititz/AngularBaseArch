import { NgModule } from '@angular/core';
import {AccordionModule} from 'primeng/accordion';
import {SplitterModule} from 'primeng/splitter';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {DataViewModule} from 'primeng/dataview';
import {TooltipModule} from 'primeng/tooltip';
import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ButtonModule} from 'primeng/button';
import {BlockUIModule} from 'primeng/blockui';
import {ToastModule} from 'primeng/toast';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TableModule} from 'primeng/table';
import {InputNumberModule} from 'primeng/inputnumber';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {InputMaskModule} from 'primeng/inputmask';
import { RippleModule } from 'primeng/ripple';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {PasswordModule} from 'primeng/password';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';
import {MultiSelectModule} from 'primeng/multiselect';
import {KeyFilterModule} from 'primeng/keyfilter';
import {SidebarModule} from 'primeng/sidebar';
import {MessageModule} from 'primeng/message';
import {CheckboxModule} from 'primeng/checkbox';
import {CalendarModule} from 'primeng/calendar';
import {EditorModule} from 'primeng/editor';
import {ChipsModule} from 'primeng/chips';
import {InputSwitchModule} from 'primeng/inputswitch';
import {TreeTableModule} from 'primeng/treetable';
import {TabViewModule} from 'primeng/tabview';
import {FileUploadModule} from 'primeng/fileupload';
import {ImageModule} from 'primeng/image';


const primengComp = [
  AccordionModule,
  SplitterModule,
  TreeTableModule,
  MessageModule,
  ImageModule,
  VirtualScrollerModule,
  DataViewModule,
  TooltipModule,
  EditorModule,
  InputSwitchModule,
  CalendarModule,
  ChipsModule,
  ConfirmDialogModule,
  InputTextModule,
  FileUploadModule,
  CardModule,
  SidebarModule,
  KeyFilterModule,
  TabViewModule,
  AutoCompleteModule,
  ButtonModule,
  BlockUIModule,
  TriStateCheckboxModule,
  CheckboxModule,
  ConfirmPopupModule,
  ToastModule,
  InputNumberModule,
  ProgressSpinnerModule,
  TableModule,
  DropdownModule,
  DialogModule,
  InputMaskModule,
  RippleModule,
  MultiSelectModule,
  InputTextareaModule,
  ToggleButtonModule,
  PasswordModule
]

@NgModule({
  imports: [
    primengComp
  ],
  exports: [
    primengComp
  ]
})

export class PrimengcompModule { }
