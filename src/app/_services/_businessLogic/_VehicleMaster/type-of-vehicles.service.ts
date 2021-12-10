import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { User } from '../../../_models';

@Injectable({
  providedIn: 'root'
})
export class TypeOfVehiclesService {
  constructor(private http: HttpClient) { }

  public userData = [];
  private baseServiceUrl = '/type-of-vehicles'

  getAll(e:any) {
      return this.http.get<any[]>(`${environment.apiUrl+this.baseServiceUrl}?${e}`);
  }
  
  submitform(e:any){
    var formDatas = new FormData();

    if(e['file']){
      formDatas.append('file', e['file']);
    }

    formDatas.append('name', e['name']);
    formDatas.append('imageUrl', '');
    formDatas.append('description', e['description']);
    formDatas.append('isActive', e['isActive']);
    formDatas.append('id', e['id']);
    if(e['id']){
      return this.http.put<any[]>(`${environment.apiUrl+this.baseServiceUrl}`, formDatas);
    }
    else{
      e['id'] = 0
      formDatas.append('id', e['id']);
      return this.http.post<any[]>(`${environment.apiUrl+this.baseServiceUrl}`, formDatas);
    }
  }

  delete(e:any){
      return this.http.delete<any[]>(`${environment.apiUrl+this.baseServiceUrl}/`+ e?.id);
  }

  deleteSelected(e:any){
    return this.http.post<any[]>(`${environment.apiUrl+this.baseServiceUrl}`+'/delete-all', e);
  }

  ImportCSV(e:any){
    return this.http.post<any[]>(`${environment.apiUrl+this.baseServiceUrl}`+'/add-all', e);
  }
}
