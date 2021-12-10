import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { RootService } from '../../_helpers/root.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileSettingService {
  constructor(private http: HttpClient, public RootService: RootService, private router: Router,) { }

  public userData = [];
  private baseServiceUrl = '/profile-setting'
  private baseServiceUrl_auth = '/auth/profile-setting'

  getAll() {
    return this.http.get<any[]>(`${environment.apiUrl + this.baseServiceUrl_auth}`);
}

  submitform(e: any) {
    var formData = new FormData();
    Object.keys(e).forEach(function(key) {
      if(key == 'logoSmallFile' || key == 'logoLargeFile'){
        if(e['logoSmallFile'])
          formData.append(key, e['logoSmallFile'])
        if(e['logoLargeFile'])
          formData.append(key, e['logoLargeFile'])
      }else{
        formData.append(key, e[key])
      }
    })
    if (e['id']) {
      return this.http.put<any[]>(`${environment.apiUrl + this.baseServiceUrl}`, formData);
    }
    else {
      e['id'] = 0
      formData.append('id', e['id']);
      return this.http.post<any[]>(`${environment.apiUrl + this.baseServiceUrl}`, formData);
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

  // viewinvoice(e:any){
  //   console.log(e);
  //   this.RootService.insurenceData = e;
  //   this.router.navigate(['/masterwindow/invoice']);
  // }
}
