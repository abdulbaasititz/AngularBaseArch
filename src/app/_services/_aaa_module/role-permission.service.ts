import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserService } from '../../_services';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RolePermissionService {

  constructor(private http: HttpClient, private user: UserService, private router: Router,) { }

  getAll(id:string) {
    return this.http.get<any[]>(`${environment.apiUrl}/role-master?isPagination=false`);
  }

  submitform(e:any){
    if(e['id']){
      return this.http.put<any[]>(`${environment.apiUrl}/role-master`, e);
    }
    else{
      return this.http.post<any[]>(`${environment.apiUrl}/role-master`, e);
    }
  }
  delete(e:any){
    return this.http.delete<any[]>(`${environment.apiUrl}/role-master/`+ e?.id);
  }

  //
  definerole(e:any){
    this.router.navigate(['/masterwindow/rolepermission'], { queryParams: { RoleID: e?.id } });
  }

  //
  getPermissionValue(e:any){
    return this.http.get<any[]>(`${environment.apiUrl}/role-master-prm/` + e);
  }

  submitpermission(e:any){
      return this.http.put<any[]>(`${environment.apiUrl}/role-master-prm/`, e);
  }
}
