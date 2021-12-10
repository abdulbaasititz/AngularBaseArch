import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { User } from '../../../_models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) { }

  public userData = [];
  private baseServiceUrl = '/employee'

  getAll(e: any) {
    return this.http.get<any[]>(`${environment.apiUrl + this.baseServiceUrl}?${e}`);
  }

  submitform(e: any) {
    var formData = new FormData();
    Object.keys(e).forEach(function(key) {
      if(key == 'licenseFile' || key == 'registrationCertificateFile'){
        if(e['licenseFile'])
          formData.append(key, e['licenseFile'])
        if(e['registrationCertificateFile'])
          formData.append(key, e['registrationCertificateFile'])
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

  delete(e: any) {
    return this.http.delete<any[]>(`${environment.apiUrl + this.baseServiceUrl}/` + e?.id);
  }

  deleteSelected(e: any) {
    return this.http.post<any[]>(`${environment.apiUrl + this.baseServiceUrl}` + '/delete-all', e);
  }

  ImportCSV(e: any) {
    return this.http.post<any[]>(`${environment.apiUrl + this.baseServiceUrl}` + '/add-all', e);
  }

  //custon functions
  getVendorEmployeeService(e: any): Observable<any[]> {
    return this.http.get(`${environment.apiUrl}` + '/vendor-employee-service/' + e.data.value)
      .pipe(
        map((res: any) => {
          e.formData[4].Options = res.results;
          return e.formData;
        })
      );
  }

  HideShowEmployeeVehile(e: any): Observable<any[]> {
    if(e.data.value.indexOf(2) > -1){
      e.formData[5].ForceDisabled = false
    }
    else{
      e.formData[5].ForceDisabled = true
    }
    return e.formData;
  }
}
