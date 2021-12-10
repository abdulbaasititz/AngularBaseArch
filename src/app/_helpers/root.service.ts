import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RootService {

  public insurenceData:any = [];
  public ProfileData:any = {};

  constructor() { }
}
