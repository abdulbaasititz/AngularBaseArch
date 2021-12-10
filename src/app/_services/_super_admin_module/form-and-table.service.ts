import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserService } from '../../_services';

@Injectable({
  providedIn: 'root'
})
export class FormAndTableService {



  constructor(private http: HttpClient, private user: UserService,) { }

  getAllModuleByuserrole(id:string) {
    //return this.http.get<any[]>(`${environment.apiUrl}/role-master/get?roleName=` + id );
    return this.http.get<any[]>(`${environment.apiUrl}/role-master-prm/read-only`);
  }

  getAllModuleById(id:string) {
    return this.http.get<any[]>(`${environment.apiUrl}/all-module/`+ id );
  }
  getTableMainSchema(id:string) {
    return this.http.get<any[]>(`${environment.apiUrl}/table-main-schema/` +id);
  }
  getTableButtonSchema(id:string) {
    return this.http.get<any[]>(`${environment.apiUrl}/table-button-schema/`+ id );
  }
  getFormSchema(id:string) {
    return this.http.get<any[]>(`${environment.apiUrl}/form-data/` + id );
  }
  CreateFormData(data:any) {
    return this.http.post<any[]>(`${environment.apiUrl}/form-data`,  data );
  }
  submittabledata(data:any, mod:any) {
    data['sortBy'] = 0;
    data['pageMasterId'] = mod;
    //data['isActive'] = 1;

    if(data['id']){
      return this.http.put<any[]>(`${environment.apiUrl}/table-main-schema`, data);
    }
    else{
      return this.http.post<any[]>(`${environment.apiUrl}/table-main-schema`, data);
    }
  }
  delete3(e:any){
    return this.http.delete<any[]>(`${environment.apiUrl}/table-main-schema/`+ e?.id);
  }

  submittabledata2(data:any, mod:any) {
    data['pageMasterId'] = mod;
    //data['isActive'] = 1;

    if(data['id']){
      return this.http.put<any[]>(`${environment.apiUrl}/table-button-schema`, data);
    }
    else{
      return this.http.post<any[]>(`${environment.apiUrl}/table-button-schema`, data);
    }
  }

  delete2(e:any){
    return this.http.delete<any[]>(`${environment.apiUrl}/table-button-schema/`+ e?.id);
  }

}
