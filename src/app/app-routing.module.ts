import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthGuard } from './core/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  /* public routes –––––––––––––––––– */
  { path: 'login', component: LoginComponent },

  /* protected area with common layout */
  {
    path: '',
    component: LayoutComponent,          // <- holds header/sidenav + <router‑outlet>
    // canActivate: [AuthGuard],         // (optionally) put the guard here once
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module')
            .then(m => m.DashboardModule),
      },
      {
        path: 'course-details/:id',
        loadChildren: () =>
          import('./features/course-details/course-details.module')
            .then(m => m.CourseDetailsModule),
      },
      {
        path: 'my-enrollment',
        loadChildren: () =>
          import('./features/my-enrollment/my-enrollment.module')
            .then(m => m.MyEnrollmentModule),
      },
      {
        path: 'my-profile',
        loadChildren: () =>
          import('./features/profile/profile.module')
            .then(m => m.ProfileModule),
      },
    ],
  },

  /* catch‑all */
  { path: '**', redirectTo: '' },
];
// [
//   {
//     path: '',
//     redirectTo: 'dashboard',
//     pathMatch: 'full'
//   },
//   // { path: '', component: LayoutComponent },
//   { path: 'login', component: LoginComponent },
//   {
//     path: 'dashboard',
//     loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
//     // canActivate: [AuthGuard],
//   },
//   {
//     path: 'course-details/:id',
//     loadChildren: () => import('./features/course-details/course-details.module').then(m => m.CourseDetailsModule),
//     // canActivate: [AuthGuard],
//   },
//   {
//     path: 'my-enrollment',
//     loadChildren: () => import('./features/my-enrollment/my-enrollment.module').then(m => m.MyEnrollmentModule),
//     // canActivate: [AuthGuard],
//   },
//   {
//     path: 'my-profile',
//     loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule),
//     // canActivate: [AuthGuard],
//   },
//   { path: '', redirectTo: 'login', pathMatch: 'full' },
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
