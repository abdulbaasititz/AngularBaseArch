import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppserviceService {

  constructor() { }

  edited(e:any){
    console.log(e);
    
  }
}
