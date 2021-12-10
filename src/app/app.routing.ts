import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Import Containers
import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './views/login/login.component';
import { P404Component } from './views/error/404.component';
import { AuthGuard } from './_helpers';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent},
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'formbuilder',
        loadChildren: () => import('./views/formbuilder/formbuilder.module').then(m => m.FormbuilderModule)
      },
      {
        path: 'tablebuilder',
        loadChildren: () => import('./views/tablebuilder/tablebuilder.module').then(m => m.TablebuilderModule)
      },
      {
        path: 'masterwindow',
        loadChildren: () => import('./views/masterwindow/masterwindow.module').then(m => m.MasterwindowModule)
      },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
