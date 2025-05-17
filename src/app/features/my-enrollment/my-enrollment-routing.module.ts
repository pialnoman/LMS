import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyEnrollmentComponent } from './my-enrollment.component';

const routes: Routes = [{ path: '', component: MyEnrollmentComponent },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyEnrollmentRoutingModule { }
