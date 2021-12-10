import { Component, OnInit, ChangeDetectorRef, InjectionToken, Injector, ViewChild } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormAndTableService, UserService } from '../../_services';
import {MessageService} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-tablebuilder',
  templateUrl: './tablebuilder.component.html',
  styleUrls: ['./tablebuilder.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class TablebuilderComponent implements OnInit {

  public pageTitle: string;
  ModuleID: string = '';
  displayDialog: boolean = false;
  displayDialog2: boolean = false;
  @ViewChild('Form', {static: false}) Form:any;
  @ViewChild('Form2', {static: false}) Form2:any;

  virtualdata: any[] = [];
  virtualdata2: any[] = [];
  FormData: any[] = [];
  FormData2: any[] = [];
  formValue: any[] = [];
  public tableSchema :any =[];
  public tableSchema2 :any =[];
  public ModuleData: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service : FormAndTableService,
    public cd: ChangeDetectorRef,
    public user: UserService,
    private injector:Injector,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  onclickEvent(e:any){
    switch(e.action) {
      case 'edit3':
        this.editdata(e);
        break;
      case 'edit2':
        this.editdata2(e);
        break;
      case 'delete3':
        this.deletedata(e);
        break;
      case 'delete2':
        this.deletedata(e);
        break;
      default:
        this.onclickEventFormWithNoAction(e);
    }
  }
  createNew(){
    this.Form.resetForm();
    this.displayDialog =  true;
  }
  createNew2(){
    this.Form2.resetForm();
    this.displayDialog2 =  true;
  }
  editdata(e:any){
    this.displayDialog =  true;
    this.Form.updateAngForm(e['data']);
  }
  editdata2(e:any){
    this.displayDialog2 =  true;
    this.Form2.updateAngForm(e['data']);
  }
  deletedata(e:any){
    this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          this.onclickEventForm(e);
        }
    });
  }
  

  showDialogMaximized(dialog: any) {
    setTimeout(() => {
        const ele: HTMLElement = document.getElementsByClassName('pi-window-maximize')[0] as HTMLElement;
        setTimeout(() => {
            ele.click();
        }, 0);
    }, 0);
  }

  ngOnInit(): void {
    this.tableSchema['mainschema'] = [];
    this.tableSchema['buttonSchema']= [];
    this.pageTitle = this.route.snapshot.data['title'];

    this.ModuleID = this.route.snapshot.queryParams['ModuleID'] || '';

    if(this.ModuleID !== ''){
      this.getData();

      this.tableSchema['mainschema'] = [
        {field: 'field',header: 'DB Column Name',type: 'text',width: 'auto', isActive:true},
        {field: 'header',header: 'Header',type: 'text',width: 'auto', isActive:true},
        {field: 'type',header: 'Type',type: 'text',width: 'auto', isActive:true},
        {field: 'width',header: 'Width',type: 'text',width: 'auto', isActive:true},
        {field: 'isActive',header: 'Status',type: 'status',width: 'auto', isActive:true},
      ];

      this.tableSchema['buttonSchema']= [
        {icon: 'pi-pencil', tooltip: 'Edit', action: 'edit3'},
        {icon: 'pi-trash', tooltip: 'Delete', action: 'delete3'},
      ];
      this.tableSchema['serviceName'] = 'FormAndTableService';
      this.tableSchema2['serviceName'] = 'FormAndTableService';

      var datafiels = [
        { FormId: 'htu61', FieldLable: 'Text Field', Fieldname: 'inputtext', icon:'fa-text-width', size: { name: "6", code: 6}, DBColName: 'field', Label: 'DB Column Name', PlaceHolder: 'DB Column Name', ErrorTxt: '', ID: '', Class: '', Required: true, HelpTxt: '', pKeyFilter:{ name: "All", code: "all"}, pKeyFilterOther: "", functionName: "" },
        { FormId: 'htu62', FieldLable: 'Text Field', Fieldname: 'inputtext', icon:'fa-text-width', size: { name: "6", code: 6}, DBColName: 'header', Label: 'Header', PlaceHolder: 'Header', ErrorTxt: '', ID: '', Class: '', Required: true, HelpTxt: '', pKeyFilter:{ name: "All", code: "all"}, pKeyFilterOther: "", functionName: "" },
        { FormId: 'htu63', FieldLable: 'Text Field', Fieldname: 'inputtext', icon:'fa-text-width', size: { name: "6", code: 6}, DBColName: 'type', Label: 'Type', PlaceHolder: 'Type', ErrorTxt: '', ID: '', Class: '', Required: true, HelpTxt: '', pKeyFilter:{ name: "All", code: "all"}, pKeyFilterOther: "", functionName: "" },
        { FormId: 'htu64', FieldLable: 'Text Field', Fieldname: 'inputtext', icon:'fa-text-width', size: { name: "6", code: 6}, DBColName: 'width', Label: 'Width', PlaceHolder: 'Width', ErrorTxt: '', ID: '', Class: '', Required: true, HelpTxt: '', pKeyFilter:{ name: "All", code: "all"}, pKeyFilterOther: "", functionName: "" },
        { FormId: 'htu65', FieldLable: 'Switch', Fieldname: 'inputswitch', icon:'fa-check-circle', size: { name: "12", code: 12}, DBColName: 'isActive', Label: 'Status', PlaceHolder: 'Switch', ErrorTxt: '', ID: '', Class: '', Required: true, HelpTxt: '', functionName: "" },
        { FormId: '', FieldLable: 'Submit Button', Fieldname: 'submitbutton', icon:'fa-check', size: { name: "12", code: 12}, Label: 'Submit', LabelIcon: 'pi pi-check', ID: '', Class: 'p-button-secondary float-right', functionName: "submittabledata", }
      ];

      setTimeout(()=>{
        datafiels.forEach(element => {
          this.FormData.push(element);
              if(element.Fieldname == 'dropdown'){
                this.Form.updateOptionbyurl(element);
              }
              this.Form.updateAngForm();
        });
        this.cd.detectChanges();
      }, 500)
      

      this.tableSchema2['mainschema'] = [
        {field: 'icon',header: 'Icon',type: 'text',width: 'auto', isActive:true},
        {field: 'tooltip',header: 'ToolTip',type: 'text',width: 'auto', isActive:true},
        {field: 'action',header: 'Action',type: 'text',width: 'auto', isActive:true},
        {field: 'isActive',header: 'Status',type: 'status',width: 'auto', isActive:true},
      ];

      this.tableSchema2['buttonSchema']= [
        {icon: 'pi-pencil', tooltip: 'Edit', action: 'edit2'},
        {icon: 'pi-trash', tooltip: 'Delete', action: 'delete2'},
      ];

      var datafiels2 = [
        { FormId: 'htu611', FieldLable: 'Text Field', Fieldname: 'inputtext', icon:'fa-text-width', size: { name: "6", code: 6}, DBColName: 'icon', Label: 'Icon', PlaceHolder: 'Icon', ErrorTxt: '', ID: '', Class: '', Required: true, HelpTxt: '', pKeyFilter:{ name: "All", code: "all"}, pKeyFilterOther: "", functionName: "" },
        { FormId: 'htu621', FieldLable: 'Text Field', Fieldname: 'inputtext', icon:'fa-text-width', size: { name: "6", code: 6}, DBColName: 'toolTip', Label: 'Tooltip', PlaceHolder: 'Tooltip', ErrorTxt: '', ID: '', Class: '', Required: true, HelpTxt: '', pKeyFilter:{ name: "All", code: "all"}, pKeyFilterOther: "", functionName: "" },
        { FormId: 'htu631', FieldLable: 'Text Field', Fieldname: 'inputtext', icon:'fa-text-width', size: { name: "6", code: 6}, DBColName: 'action', Label: 'Action', PlaceHolder: 'Action', ErrorTxt: '', ID: '', Class: '', Required: true, HelpTxt: '', pKeyFilter:{ name: "All", code: "all"}, pKeyFilterOther: "", functionName: "" },
        { FormId: 'htu641', FieldLable: 'Switch', Fieldname: 'inputswitch', icon:'fa-check-circle', size: { name: "12", code: 12}, DBColName: 'isActive', Label: 'Status', PlaceHolder: 'Switch', ErrorTxt: '', ID: '', Class: '', Required: true, HelpTxt: '', functionName: "" },
        { FormId: '', FieldLable: 'Submit Button', Fieldname: 'submitbutton', icon:'fa-check', size: { name: "12", code: 12}, Label: 'Submit', LabelIcon: 'pi pi-check', ID: '', Class: 'p-button-secondary float-right', functionName: "submittabledata2", }
      ];

      setTimeout(()=>{
        datafiels2.forEach(element => {
          this.FormData2.push(element);
              if(element.Fieldname == 'dropdown'){
                this.Form2.updateOptionbyurl(element);
              }
              this.Form2.updateAngForm();
        });
        this.cd.detectChanges();
      }, 500)
     
    }
    else{
      console.log('Error: in loading module id')
    } 
  }

  getData(){
    this.service.getTableMainSchema(this.ModuleID).subscribe(
      data => {
        this.virtualdata = data['results'];
        this.cd.detectChanges();
      },
      error => { }
    );
    this.service.getTableButtonSchema(this.ModuleID).subscribe(
      data => {
        this.virtualdata2 = data['results'];
        this.cd.detectChanges();
      },
      error => { }
    );
  }
  onclickEventFormWithNoAction(e:any){
    let action = e.action;
    if(this.service[action]) {
        let param = e.data
        this.service[action](param, this.ModuleID);
    }
  }
  onclickEventForm(e:any){
    let action = e.action;
    if(this.service[action]) {
        let param = e.data
        this.service[action](param, this.ModuleID).subscribe(
          data => { 
            if(data['status'] == 1){
              this.displayDialog =  false;
              this.displayDialog2 =  false;
              this.getData();
              this.Form.resetForm();
              this.messageService.add({severity:'success', summary: data['message'], detail:''});
            }
            else{
              this.messageService.add({severity:'success', summary: 'Error:', detail:data});
            }
            
           },
          error => {this.messageService.add({severity:'success', summary: error, detail:''});});
    }
  }
}
