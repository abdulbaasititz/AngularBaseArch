import { Component,ViewChild, ElementRef, OnInit, Input, AfterViewInit ,Output, EventEmitter, ChangeDetectorRef, OnChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import {Message,MessageService} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class FormComponent implements OnInit {

  @Input() formData: any = [];
  @Input() formValue: any = [];
  @Input() type: string = '';
  @Output() onclickEvent = new EventEmitter<string>();
  public angForm: FormGroup;
  display: boolean = false;
  editScreen: boolean = false;
  public selectedItem: any = [];


  public pcolOptions = [
    {name: '1', code: 1},
    {name: '2', code: 2},
    {name: '3', code: 3},
    {name: '4', code: 4},
    {name: '5', code: 5},
    {name: '6', code: 6},
    {name: '7', code: 7},
    {name: '8', code: 8},
    {name: '9', code: 9},
    {name: '10', code: 10},
    {name: '11', code: 11},
    {name: '12', code: 12}
  ];
  public pKeyFilterOptions = [
      {name: 'All', code: 'all'},
      {name: 'Positive integers', code: 'pint'},
      {name: 'Integers', code: 'int'},
      {name: 'Positive numbers', code: 'pnum'},
      {name: 'Numbers', code: 'num'},
      {name: 'Email', code: 'email'},
      {name: 'Alphabetic', code: 'alpha'},
      {name: 'Alphanumeric', code: 'alphanum'},
      {name: 'Hexadecimal', code: 'hex'},
      {name: 'Other', code: 'other'}
  ];

  constructor(private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    private http: HttpClient,
    ) {
    this.angForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.angForm.reset();
  }

  returnregex(e:any){
     var ccRegex: RegExp = /^[0-9]\d*$/;
     return ccRegex;
  }

  updateAngForm(data = null){

    if(this.selectedItem.length !== 0 ){
      const requiredIndex = this.formData.findIndex(el => {
          return el.FormId === String(this.selectedItem.FormId);
      });
      if(requiredIndex === -1){
          return false;
      };
      this.formData.splice(requiredIndex, 1);
      this.formData.splice(requiredIndex, 0, this.selectedItem);
    }



    let group={}
    this.formData.forEach(element => {
      var valid = element.Required == true?Validators.required: null;
      var angvalue: any = '';
      if(data !== null){
        Object.keys(data).forEach(function(key) {
          if(element.DBColName == key){
            angvalue = data[key];
          }
          if(key == 'ID' || key == 'id' ){
            group['id']=new FormControl(data[key]);
          }
        });
      }
      else{
        if(element.Fieldname == 'inputswitch'){
          angvalue = false;
        }
        if(element.DBColName == 'isActive'){
          angvalue = true;
        }
      }
      group[element.DBColName]=new FormControl(angvalue, valid);
      console.log(group)
    });

    this.angForm = new FormGroup(group);
    this.cd.detectChanges();
  }

  detectChanges(){
    console.log(this.formData);
    this.cd.detectChanges();
  }

  editFormItem(fData: any){
    this.display = true;
    this.selectedItem = JSON.parse(JSON.stringify(fData));
  }

  updateOption(selectedItem:any){
    console.log(selectedItem);
    var option = selectedItem.Option;
    var optionvalue = [];
    if(typeof(option) == 'object'){
      selectedItem.Options = option;
    }else{
      option.split(',').forEach(element => {
        var data = {'code': element, 'name': element }
        optionvalue.push(data);
      });
      selectedItem.Options = optionvalue;
    }

    this.updateAngForm();
  }
  updateOptionbyurl(selectedItem:any){
    let url: string = `${environment.apiUrl}` + selectedItem.OptionsURL; //

    this.http.get(url).subscribe(
      data => {
        selectedItem.Options = data['results'];
        this.updateAngForm();
      },
      error => {}
    );

  }

  removeFormItem(fData: any){
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
          accept: () => {
            //this.formData = this.formData.filter(item=>item.FormId !=fData.FormId );
            const requiredIndex = this.formData.findIndex(el => {
                return el.FormId === String(fData.FormId);
            });
            if(requiredIndex === -1){
                return false;
            };
            return !!this.formData.splice(requiredIndex, 1);
            }
      });
  }
  resetForm(){
    this.angForm.reset();
    this.updateAngForm();
  }

  onClickEvent(e: any, a:any) {
    var data :any = {
      'data': e,
      'action': a,
      'formData': this.formData
    }
    this.onclickEvent.next(data);
  }

  onFileChange(event: any, fData: any) {
    const reader = new FileReader();

    if (event.files && event.files.length) {
      const [file] = event.files;
      this.angForm.patchValue({
        [fData]: file
      });
      //reader.readAsDataURL(file);

      /*reader.onload = () => {
            this.angForm.patchValue({
              [fData]: reader.result
            });
      };*/

    }
  }

}
