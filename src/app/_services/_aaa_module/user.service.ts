import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { User } from '../../_models';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) { }

    public userData = [];
    public baseServiceUrl = '/user-master'

    getAll() {
        return this.http.get<any[]>(`${environment.apiUrl}/user-master?isPagination=false`);
    }
    submitform(e:any){
        if(e['id']){
          return this.http.put<any[]>(`${environment.apiUrl}/user-master`, e);
        }
        else{
          return this.http.post<any[]>(`${environment.apiUrl}/user-master`, e);
        }
    }

    delete(e:any){
        return this.http.delete<any[]>(`${environment.apiUrl}/user-master/`+ e?.id);
    }

    deleteSelected(e:any){
        return this.http.post<any[]>(`${environment.apiUrl+this.baseServiceUrl}`+'/delete-all', e);
      }

      ImportCSV(e:any){
        return this.http.post<any[]>(`${environment.apiUrl+this.baseServiceUrl}`+'/add-all', e);
      }
}
