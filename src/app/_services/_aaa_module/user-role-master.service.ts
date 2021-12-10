import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserService } from '../../_services';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserRoleMasterService {

  public baseServiceUrl = '/userrolemaster'

  constructor(private http: HttpClient, private user: UserService, private router: Router,) { }

  getAll(id:string) {
    return this.http.get<any[]>(`${environment.apiUrl}/userrolemaster/getAll`);
  }

  submitform(e:any){
    e['CRBY'] = this.user.userData['ID'];
    if(e['ID']){
      return this.http.post<any[]>(`${environment.apiUrl}/userrolemaster/update`, e);
    }
    else{
      return this.http.post<any[]>(`${environment.apiUrl}/userrolemaster/create`, e);
    }
  }
  delete(e:any){
    return this.http.post<any[]>(`${environment.apiUrl}/userrolemaster/delete`, e);
  }
  deleteSelected(e:any){
    return this.http.post<any[]>(`${environment.apiUrl+this.baseServiceUrl}`+'/delete-all', e);
  }

  ImportCSV(e:any){
    return this.http.post<any[]>(`${environment.apiUrl+this.baseServiceUrl}`+'/add-all', e);
  }
}
