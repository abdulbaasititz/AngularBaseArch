import {Component, OnInit, AfterViewInit } from '@angular/core';
import { navItems } from '../../_nav';
import { AuthenticationService, WebhooksService, UserService, FormAndTableService } from '../../_services';
import {MessageService} from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import {RootService} from '../../_helpers/root.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  providers: [MessageService]
})
export class DefaultLayoutComponent implements OnInit, AfterViewInit {
  public sidebarMinimized = true;
  public navItems = navItems;

  constructor(public RootService: RootService,private messageService: MessageService,private router: Router,  public authenticationService: AuthenticationService, private module: FormAndTableService, private user: UserService) {

  }

  ngOnInit(): void {
    this.user.userData = JSON.parse(localStorage.getItem('currentUser'));
  }
  ngAfterViewInit() {
    this.module.getAllModuleByuserrole(this.user.userData['rol']).subscribe(
      data => {
        if(data['status'] == 1){
          this.messageService.add({severity:'success', summary: data['message'], detail:''});
          this.navItems  = this.unflatten(data['results']);
          console.log(this.navItems);
        }
        else{
          this.messageService.add({severity:'success', summary: 'Error:', detail:data['errorMessage']});
        }
      },
      error => {this.messageService.add({severity:'success', summary: error, detail:''});}
    );
  }
  unflatten(list:any)  {
    var map = {}, node, roots = [], i;

    for (i = 0; i < list.length; i += 1) {
      map[list[i].id] = i; // initialize the map
      if(list[i].parent == true){
        list[i].children = []; // initialize the children
      }
      else{
        list[i].linkProps = { queryParams: { 'ModuleID': list[i].id } }
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

    roots.sort(function(a,b){
        return a.sortId - b.sortId;
        }
    );
    return roots;
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  logout(){
    this.authenticationService.logout();
  }

  Setting(){
    this.router.navigate(['masterwindow/settings']);
  }
}
