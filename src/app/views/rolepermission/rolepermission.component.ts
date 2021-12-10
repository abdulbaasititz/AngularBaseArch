import { Component, OnInit, ChangeDetectorRef, InjectionToken, Injector, ViewChild } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormAndTableService, RolePermissionService } from '../../_services';
import {MessageService} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-rolepermission',
  templateUrl: './rolepermission.component.html',
  styleUrls: ['./rolepermission.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class RolepermissionComponent implements OnInit {

  public RoleID: any;
  public roleData: any;
  public result = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private tableandform : FormAndTableService,
    public cd: ChangeDetectorRef,
    public rolepermission: RolePermissionService,
    private injector:Injector,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,) { }

  ngOnInit(): void {

    this.RoleID = this.route.snapshot.queryParams['RoleID'] || '';

    this.rolepermission.getPermissionValue(this.RoleID).subscribe(
      data => {
        this.roleData = this.unflatten(data['results']);
      },
      error => { }
    );
  }

  unflatten(list:any)  {
    var map = {}, node, roots = [], i;
  
    for (i = 0; i < list.length; i += 1) {
      map[list[i].pageMasterId] = i; 
      if(list[i].parent == true){
        list[i].children = []; // initialize the children
      } 
    }
    
    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parentId !== 0) {
        // if you have dangling branches check that map[node.parentId] exists
        list[map[node.parentId]].children.push(node);
      } else {
        roots.push(node);
      }
    }

    roots.sort(function(a,b){ return a.sortId - b.sortId; });
    return roots;
  }

  flat(treeNode) {
    if (treeNode == null || treeNode == undefined) {
      return;
    }
  treeNode.forEach(node=>{
      this.result.push(node);
      

      if (node.children !== null || node.children !== undefined){
        node.expanded = true;
        this.flat(node.children);
      }
          
      }
    )
  }

  Update(){
    var data =  this.flat(this.roleData);

    this.result.forEach((node:any)=>{
      delete node['parent'];
    });
    this.rolepermission.submitpermission(this.result).subscribe(
      data => {
        this.result = [];
        if(data['status'] == 1){
          this.messageService.add({severity:'success', summary: data['message'], detail:''});
        }
        else{
          this.messageService.add({severity:'success', summary: 'Error:', detail:data['errorMessage']});
        }
      },
      error => {console.log(error);this.result = [];}
    );
  }

  getdata(e){
    console.log(e);
    return e;
  }

  handleChange(e, t){
    if(e.children){
      e.children.forEach(element => {
        element[t] = e[t];
      });
    }
  }

}
