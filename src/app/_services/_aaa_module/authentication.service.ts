import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { User } from '../../_models';
import jwt_decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        var data = {
            "userId":email,
            "password":password
        }
        return this.http.post<any>(`${environment.apiUrl}/auth/web-login`, data)
            .pipe(map(user => {
                if(user['status'] == 1){
                    var token = user['refreshToken'];
                    var userData = this.getDecodedAccessToken(user['refreshToken']);
                    userData.token = token;
                    localStorage.setItem('currentUser', JSON.stringify(userData));
                    this.currentUserSubject.next(userData);
                }
                return user;
            }));
    }

    getDecodedAccessToken(token: string): any {
        try{
            return jwt_decode(token);
        }
        catch(Error){
            return null;
        }
      }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        location.reload();
    }


}
