import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthGuard } from './core/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: LayoutComponent,
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
      {
        path: 'learning-history',
        loadChildren: () =>
          import('./features/learning-history/learning-history.module')
            .then(m => m.LearningHistoryModule),
      },
    ],
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
