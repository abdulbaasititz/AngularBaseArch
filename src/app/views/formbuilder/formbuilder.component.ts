import { Component, OnInit, ViewChild } from '@angular/core';
import {CdkDragDrop, moveItemInArray, copyArrayItem, transferArrayItem} from '@angular/cdk/drag-drop';
import {formItems} from '../../containers/form/form_json';
import {AppserviceService} from '../../appservice.service';
import { FormAndTableService, UserService } from '../../_services';
import { ActivatedRoute, Router  } from '@angular/router';
import {MessageService} from 'primeng/api';
import { Location } from '@angular/common';


@Component({
  selector: 'app-formbuilder',
  templateUrl: './formbuilder.component.html',
  styleUrls: ['./formbuilder.component.scss'],
  providers: [MessageService]
})
export class FormbuilderComponent implements OnInit {

  public formItems = formItems;
  public done:any = [];
  ModuleID: string = '';
  @ViewChild('Form', {static: false}) Form:any;


  constructor(public service: AppserviceService,
     private messageService: MessageService,
     private route: ActivatedRoute,
     private user: UserService,
     private location: Location,
     private tableandform : FormAndTableService,) { }

  ngOnInit(): void {
    this.ModuleID = this.route.snapshot.queryParams['ModuleID'] || '';

    this.tableandform.getFormSchema(this.ModuleID).subscribe(
      data => {
        data['results'].forEach(element => {
          var objh = JSON.parse(element);
          this.done.push(objh);
          if(objh.Fieldname == 'dropdown'){
            this.Form.updateOptionbyurl(objh);
          }
          if(objh.Fieldname == 'multiselect'){
            this.Form.updateOptionbyurl(objh);
          }

          this.Form.updateAngForm();
        });
      },
      error => { }
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {

      copyArrayItem(this.createCopy(event.previousContainer.data),
        event.container.data,
        event.previousIndex,
        event.currentIndex);
        event.container.data[event.currentIndex]['FormId'] = Math.random().toString(36).substring(7) + event.currentIndex;
        event.container.data[event.currentIndex]['DBColName'] += Math.random().toString(36).substring(7) + event.currentIndex;

      setTimeout(()=>{
        this.Form.updateAngForm();
      }, 500);



    }
  }

  createCopy(orig){
    return  JSON.parse(JSON.stringify(orig))
  }

  onclickEvent(e:any){
    let action = e.action;
    if(this.service[action]) {
        let param = e.data
        this.service[action](param);
    }
  }

  submitDesign(){
    var data:any = [];
    var LNo = 1;
    this.done.forEach(element => {
      for(var key in element) {
        if(key != 'Options'){
          data.push(
            {
              'header': key,
              'liNo': LNo,
              'pageMasterId': this.ModuleID,
              'value': JSON.stringify(element[key]),
            }
          )
        }
      }
      LNo++;
    });
    this.tableandform.CreateFormData(data).subscribe(
      data => {
        if(data['status'] == 1){
          this.messageService.add({severity:'success', summary: data['message'], detail:''});
          setTimeout(()=>{
            this.location.back();
          }, 500)
        }
        else{
          this.messageService.add({severity:'success', summary: 'Error:', detail:data['errorMessage']});
        }
      },
      error => {this.messageService.add({severity:'success', summary: error, detail:data['errorMessage']});}
    );
  }

}
