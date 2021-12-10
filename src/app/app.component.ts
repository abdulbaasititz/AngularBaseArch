import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { freeSet } from '@coreui/icons';

import { ProfileSettingService } from './_services/_aaa_module/ProfileSetting.service'
import { RootService } from './_helpers/root.service'

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>',
  providers: [IconSetService],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    public iconSet: IconSetService,

    private ProfileSettingService: ProfileSettingService,
    private RootService: RootService,
  ) {
    // iconSet singleton
    iconSet.icons = { ...freeSet };
  }

  ngOnInit() {

    this.RootService.ProfileData = JSON.parse(localStorage.getItem("ProfileData"));

    this.ProfileSettingService.getAll().subscribe((data:any)=>{
      this.RootService.ProfileData = data?.results[0];
      localStorage.setItem("ProfileData", JSON.stringify(data?.results[0]));
    })
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
