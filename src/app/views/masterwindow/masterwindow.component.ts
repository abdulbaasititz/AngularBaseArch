import { Component, OnInit, ChangeDetectorRef, InjectionToken, Injector, ViewChild } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormAndTableService, UserService } from '../../_services';
import {MessageService} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { HttpClient } from "@angular/common/http";
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-masterwindow',
  templateUrl: './masterwindow.component.html',
  styleUrls: ['./masterwindow.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class MasterwindowComponent implements OnInit {

  public pageTitle: string;
  public files: NgxFileDropEntry[] = [];

  ModuleID: string = '';
  displayDialog: boolean = false;
  displayDialog2: boolean = false;
  displayView: boolean = false;

  @ViewChild('Form', {static: false}) Form:any;
  @ViewChild('table', {static: false}) table:any;

  virtualdata: any[] = [];
  FormData: any[] = [];
  formValue: any[] = [];
  headersRow: any[] = [];
  csvRecordsArray: any[] = [];
  public tableSchema :any =[];
  public ModuleData: any;
  public service: any;
  public OtherOptions: any = {};
  viewData: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tableandform : FormAndTableService,
    public cd: ChangeDetectorRef,
    public user: UserService,
    private injector:Injector,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private http: HttpClient
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  onclickEvent(e:any){
    switch(e.action) {
      case 'edit':
        this.editdata(e);
        break;
      case 'view':
        this.viewdata(e);
        break;
      case 'delete':
        this.deletedata(e);
        break;
      case 'deleteSelected':
        this.deleteSelected(e.data);
        break;
      default:
        this.onclickEventFormWithNoAction(e);
    }
  }

  viewdata(e:any){
    this.displayView = true;
    this.viewData = e?.data;
    console.log(this.tableSchema);
  }
  deleteSelected(e:any){
    this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          this.service.deleteSelected(e).subscribe(
            data => {
              //this.getData();
              this.table.refreshTable();
              this.Form.resetForm();
              this.messageService.add({severity:'success', summary: data['message'], detail:''});
              this.cd.detectChanges();
            },
            error => {  }
          );
        }
    });
  }
  createNew(){
    this.Form.resetForm();
    this.Form.editScreen = false;
    this.displayDialog =  true;
  }
  editdata(e:any){
    this.displayDialog =  true;
    this.Form.editScreen = true;
    this.Form.updateAngForm(e['data']);
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
            //ele.click(); -- Max Form Screen
        }, 0);
    }, 0);
  }

  ngOnInit(): void {
    this.tableSchema['mainschema'] = [];
    this.tableSchema['buttonSchema']= [];
    this.pageTitle = this.route.snapshot.data['title'];

    this.ModuleID = this.route.snapshot.queryParams['ModuleID'] || '';

    if(this.ModuleID !== ''){
      this.tableandform.getAllModuleById(this.ModuleID).subscribe(
        data => {
          this.ModuleData = data['results']['pageMaster'];
          if(this.ModuleData.options !== ''){
             this.OtherOptions = JSON.parse(this.ModuleData.options);
             this.tableSchema['OtherOptions'] = JSON.parse(this.ModuleData.options);
          }
          this.tableSchema['buttonSchema'] = data['results']['tableButtonSchema'];
          this.tableSchema['mainschema'] = data['results']['tableMainSchema'];
          this.tableSchema['roleMasterPrm'] = data['results']['roleMasterPrm'];
          this.tableSchema['serviceName'] = this.ModuleData.serviceName;

          if(this.tableSchema['roleMasterPrm'].read !== true){
            this.messageService.add({severity:'error', summary: 'Error:', detail:'No Access'});
            return;
          }


          this.pageTitle = this.ModuleData.name;
          this.service = this.injector.get(<any>this.ModuleData.serviceName);
          //this.getData(); -- moved to datatable for pagination

          data['results']['formData'].forEach(element => {
            var objh = JSON.parse(element);
            this.FormData.push(objh);
            if(objh.Fieldname == 'dropdown'){
              this.Form.updateOptionbyurl(objh);
            }
            else if(objh.Fieldname == 'multiselect'){
              this.Form.updateOptionbyurl(objh);
            }
            this.Form.updateAngForm();
          });

          this.cd.detectChanges();
        },
        error => { }
      );
    }
    else{
      console.log('Error: in loading module id')
    }
  }

  import(){
    this.displayDialog2 =  true;
    this.displayDialog = false;
  }

  getData(){
    this.service.getAll().subscribe(
      data => {
        this.virtualdata = data['results'];
        this.cd.detectChanges();
      },
      error => { }
    );
  }
  onclickEventFormWithNoAction(e:any){
    let action = e.action;
    if(this.service[action]) {
        let param = e.data
        this.service[action](param);
    }
  }
  onclickEventForm(e:any){
    let action = e.action;
    if(this.service[action]) {
        let param;
        if(e.action == 'submitform'){
          param = e.data
        }
        else if(e.action == 'delete'){
          param = e.data
        }
        else{
          param = e
        }

        this.service[action](param).subscribe(
          data => {
            console.log('df',data)
            if(e.action == 'submitform' && data['status'] == 1){
                this.displayDialog =  false;
                //this.getData();
                this.table.refreshTable();
                this.Form.resetForm();
                this.messageService.add({severity:'success', summary: data['message'], detail:''});
            }
            else if(e.action == 'delete' && data['status'] == 1){
                this.displayDialog =  false;
                //this.getData();
                this.table.refreshTable();
                this.Form.resetForm();
                this.messageService.add({severity:'success', summary: data['message'], detail:''});
            }
            else if(e.action !== 'submitform'){
              this.FormData = data;
              this.cd.detectChanges();
              this.Form.detectChanges();
              //this.Form.updateAngForm();
            }
            else{
              this.messageService.add({severity:'error', summary: 'Error:', detail:data});
            }

           },
          error => {this.messageService.add({severity:'error', summary: 'Errorq:', detail:error});});
    }
  }


  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          //console.log(droppedFile.relativePath, file);
          let reader = new FileReader();
          reader.readAsText(file);

          reader.onload = () => {
            let csvData = reader.result;
            this.csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

            this.headersRow = this.getHeaderArray(this.csvRecordsArray);
            this.csvRecordsArray = this.getFullArray(this.csvRecordsArray);

          };

          reader.onerror = function () {
            console.log('error is occured while reading file!');
          };

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  getFullArray(csvRecordsArr: any) {
    csvRecordsArr.splice(0,1);
    let headerArray = [];
    for (let j = 0; j < csvRecordsArr.length - 1; j++) {
      headerArray.push( (<string>csvRecordsArr[j]).split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/));
    }
    return headerArray;
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {

      this.FormData.forEach((e:any)=>{
        if(e.DBColName == headers[j]){
          e.csvheader = j;
        }
      })
      headerArray.push( {code: j, name: headers[j]} );
    }
    return headerArray;
  }

  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
  }
  public reset(){
    this.headersRow = [];
    this.csvRecordsArray = [];
    this.FormData.forEach(fd=>{fd.defaultValue = undefined;fd.csvheader = undefined;});
  }



  importcsv(){
    if(this.csvRecordsArray.length == 0){
      this.messageService.add({severity:'error', summary: 'Error:', detail:'Insert CSV File'});
      return;
    }
    this.FormData.forEach(element => {
      if(element.Required == true && element.csvheader == undefined && element.defaultValue == undefined){
        this.messageService.add({severity:'error', summary: 'Error:', detail:'Fill Required Field '+ element.Label});
        return;
      }
    });

    if(this.service['ImportCSV']) {
        let param = [];

        this.csvRecordsArray.forEach(ele=>{
          var data  = {};
          this.FormData.forEach(fd=>{
            if(fd.Fieldname != 'submitbutton'){
              if(fd.defaultValue !== undefined){
                data[fd.DBColName] = fd.defaultValue;
              }
              else if(fd.csvheader !== null){
                data[fd.DBColName] = ele[fd.csvheader];
              }
              else{
                data[fd.DBColName] = true
              }
            }
          });
          param.push(data);
        })

        this.service['ImportCSV'](param).subscribe(
          data => {
            if(data['status'] == 1){
              this.displayDialog2 =  false;
              setTimeout(()=>{
                //this.getData();
                this.table.refreshTable();
              }, 500)
              this.Form.resetForm();
              this.reset();
              this.FormData.forEach(fd=>{fd.defaultValue = undefined;fd.csvheader = undefined;});
              this.messageService.add({severity:'success', summary: data['message'], detail:''});
            }
            else{
              this.messageService.add({severity:'error', summary: 'Error:', detail:data});
            }

          },
          error => {this.messageService.add({severity:'error', summary: 'Error:', detail:error});});
    }
  }

  dowldDemoCSV(){
    var hdf = [];
    this.FormData.forEach(element => {
      if(element.Fieldname != "submitbutton" ){
        hdf.push(element.DBColName);
      }
    });
    let csvArray = hdf.join(',');
    var blob = new Blob([csvArray], {type: 'text/csv' })
    saveAs(blob, "DemoCSVFile.csv");
  }

}
