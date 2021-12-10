import { Component, OnInit, ChangeDetectorRef, InjectionToken, Injector, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormAndTableService, RolePermissionService, ProfileSettingService } from '../../_services';
import {MessageService} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class SettingsComponent implements OnInit, AfterViewInit {

  FormData: any[] = [ ];
  @ViewChild('Form', {static: false}) Form:any;

  public ModuleData: any;
  public service: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private tableandform : FormAndTableService,
    public cd: ChangeDetectorRef,
    public rolepermission: RolePermissionService,
    public ProfileSettingService: ProfileSettingService,
    private injector:Injector,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,) { }

  ngAfterViewInit(): void {
    var data = [
      {
        FormId: '1',
        FieldLable: 'Text Field',
        Fieldname: 'inputtext',
        icon:'fa-text-width',
        size: { name: "12", code: 12},
        DBColName: 'companyName',
        Label: 'Company Name',
        PlaceHolder: 'Company Name',
        ErrorTxt: '',
        ID: '',
        Class: '',
        Required: false,
        HelpTxt: '',
        pKeyFilter:{ name: "All", code: "all"},
        pKeyFilterOther: "",
        functionName: "",
        Disabled: false,
        ForceDisabled: false,
        MaxTextLength: 32,
      },
      {
        FormId: '3',
        FieldLable: 'Text Field',
        Fieldname: 'inputtext',
        icon:'fa-text-width',
        size: { name: "12", code: 12},
        DBColName: 'email',
        Label: 'Email',
        PlaceHolder: 'Email',
        ErrorTxt: '',
        ID: '',
        Class: '',
        Required: false,
        HelpTxt: '',
        pKeyFilter:{ name: "All", code: "all"},
        pKeyFilterOther: "",
        functionName: "",
        Disabled: false,
        ForceDisabled: false,
        MaxTextLength: 32,
      },
      {
        FormId: '4',
        FieldLable: 'Text Field',
        Fieldname: 'inputtext',
        icon:'fa-text-width',
        size: { name: "12", code: 12},
        DBColName: 'phoneNumber',
        Label: 'PhoneNumber',
        PlaceHolder: 'PhoneNumber',
        ErrorTxt: '',
        ID: '',
        Class: '',
        Required: false,
        HelpTxt: '',
        pKeyFilter:{ name: "All", code: "all"},
        pKeyFilterOther: "",
        functionName: "",
        Disabled: false,
        ForceDisabled: false,
        MaxTextLength: 32,
      },
      {
        FormId: '5',
        FieldLable: 'Text Field',
        Fieldname: 'inputtext',
        icon:'fa-text-width',
        size: { name: "12", code: 12},
        DBColName: 'addressOne',
        Label: 'AddressOne',
        PlaceHolder: 'AddressOne',
        ErrorTxt: '',
        ID: '',
        Class: '',
        Required: false,
        HelpTxt: '',
        pKeyFilter:{ name: "All", code: "all"},
        pKeyFilterOther: "",
        functionName: "",
        Disabled: false,
        ForceDisabled: false,
        MaxTextLength: 32,
      },
      {
        FormId: '6',
        FieldLable: 'Text Field',
        Fieldname: 'inputtext',
        icon:'fa-text-width',
        size: { name: "12", code: 12},
        DBColName: 'addressTwo',
        Label: 'AddressTwo',
        PlaceHolder: 'AddressTwo',
        ErrorTxt: '',
        ID: '',
        Class: '',
        Required: false,
        HelpTxt: '',
        pKeyFilter:{ name: "All", code: "all"},
        pKeyFilterOther: "",
        functionName: "",
        Disabled: false,
        ForceDisabled: false,
        MaxTextLength: 32,
      },
      {
        FormId: '45',
        FieldLable: 'upload',
        Fieldname: 'upload',
        icon:'fa-cloud-upload ',
        size: { name: "12", code: 12},
        DBColName: 'logoSmallFile',
        Label: 'LogoSmall',
        PlaceHolder: 'LogoSmall',
        ErrorTxt: '',
        ID: '',
        Class: '',
        Required: false,
        HelpTxt: '',
        accept: 'image/*',
        maxsize: '1090000',
        Disabled: false,
        ForceDisabled: false,
      },
      {
        FormId: '456',
        FieldLable: 'upload',
        Fieldname: 'upload',
        icon:'fa-cloud-upload ',
        size: { name: "12", code: 12},
        DBColName: 'logoLargeFile',
        Label: 'LogoLarge',
        PlaceHolder: 'LogoLarge',
        ErrorTxt: '',
        ID: '',
        Class: '',
        Required: false,
        HelpTxt: '',
        accept: 'image/*',
        maxsize: '1090000',
        Disabled: false,
        ForceDisabled: false,
      },
      {
        FormId: '4525',
        FieldLable: 'Submit Button',
        Fieldname: 'submitbutton',
        icon:'fa-check',
        size: { name: "12", code: 12},
        Label: 'Submit',
        LabelIcon: 'pi pi-check',
        ID: '',
        Class: 'float-right p-button-secondary',
        functionName: "submitform",
        Disabled: false,
        ForceDisabled: false,
      }
    ];

    data.forEach(element => {
      var objh = element;
      this.FormData.push(objh);
      if(objh.Fieldname == 'dropdown'){
        this.Form.updateOptionbyurl(objh);
      }
      else if(objh.Fieldname == 'multiselect'){
        this.Form.updateOptionbyurl(objh);
      }
      this.Form.updateAngForm();
    });
  }

  ngOnInit(): void {
    this.service = this.injector.get(<any>'ProfileSettingService');

    this.ProfileSettingService.getAll().subscribe((data:any)=>{
      console.log(data);
      this.editdata(data.results[0])
    })
  }

  editdata(e:any){
    this.Form.editScreen = true;
    this.Form.updateAngForm(e);
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
                this.messageService.add({severity:'success', summary: data['message'], detail:''});
            }
            else if(e.action == 'delete' && data['status'] == 1){
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

}
