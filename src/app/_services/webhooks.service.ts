import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebhooksService {
  constructor(private http: HttpClient) { }

  loginError() {
      return this.http.get(`${environment.webhookUrl}/beeserp_loginError`);
  }
}
