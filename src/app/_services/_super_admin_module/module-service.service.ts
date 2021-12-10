import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserService } from '../../_services';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ModuleServiceService {

  public baseServiceUrl = '/page-master'

  constructor(private http: HttpClient, private user: UserService, private router: Router,) { }

  getAll(e:any) {
    return this.http.get<any[]>(`${environment.apiUrl}/page-master?isPagination=false`);
  }

  submitform(e:any){

    if(e.parent == true && e.parentId == null){
      e.parentId = 0;
    }

    var options = {
        'ShowImport': e['ShowImport'],
        'ShowDeleteAll': e['DeleteAll']
      }


    e['options'] = JSON.stringify(options);

    if(e['id']){
      return this.http.put<any[]>(`${environment.apiUrl}/page-master`, e);
    }
    else{
      return this.http.post<any[]>(`${environment.apiUrl}/page-master`, e);
    }
  }

  delete(e:any){
    return this.http.delete<any[]>(`${environment.apiUrl}/page-master/`+ e?.id);
  }
  formbuilder(e:any){
    this.router.navigate(['/formbuilder'], { queryParams: { ModuleID: e.id } });
  }
  tablebuilder(e:any){
    this.router.navigate(['/tablebuilder'], { queryParams: { ModuleID: e.id } });
  }
  deleteSelected(e:any){
    return this.http.post<any[]>(`${environment.apiUrl+this.baseServiceUrl}`+'/delete-all', e);
  }

  ImportCSV(e:any){
    return this.http.post<any[]>(`${environment.apiUrl+this.baseServiceUrl}`+'/add-all', e);
  }
}
