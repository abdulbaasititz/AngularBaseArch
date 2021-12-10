import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { User } from '../../../_models';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

const HttpUploadOptions = {
  headers: new HttpHeaders({ "Content-Type": 'undefined' })
}

@Injectable({
  providedIn: 'root'
})


export class CarBrandService {



  constructor(private http: HttpClient) { }

    public userData = [];
    public baseServiceUrl = '/car-brand'

    getAll(e:any) {
        return this.http.get<any[]>(`${environment.apiUrl}/car-brand?${e}`);
    }
    submitform(e:any){
        var formDatas = new FormData();

        // if(e['file']){
        //   formDatas.append('file', e['file']);
        // }

        // formDatas.append('name', e['name']);
        // formDatas.append('logoUrl', '');
        // formDatas.append('description', e['description']);
        // formDatas.append('isActive', e['isActive']);
        // formDatas.append('id', e['id']);

        Object.keys(e).forEach(function(key) {
          if(key == 'file'){
            if(e['file'])
              formDatas.append(key, e[key])
          }else{
            formDatas.append(key, e[key])
          }
          
        })

        if(e['id']){
          return this.http.put<any[]>(`${environment.apiUrl}/car-brand`, formDatas);
        }
        else{
          return this.http.post<any[]>(`${environment.apiUrl}/car-brand`, formDatas);
        }
    }

    delete(e:any){
        return this.http.delete<any[]>(`${environment.apiUrl}/car-brand/`+ e?.id);
    }

    deleteSelected(e:any){
      return this.http.post<any[]>(`${environment.apiUrl+this.baseServiceUrl}`+'/delete-all', e);
    }

    ImportCSV(e:any){
      return this.http.post<any[]>(`${environment.apiUrl+this.baseServiceUrl}`+'/add-all', e);
    }
}
