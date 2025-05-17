import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyEnrollmentRoutingModule } from './my-enrollment-routing.module';
import { MyEnrollmentComponent } from './my-enrollment.component';
import { MaterialModule } from '../../material.module';


@NgModule({
  declarations: [
    MyEnrollmentComponent
  ],
  imports: [
    CommonModule,
    MyEnrollmentRoutingModule,
    MaterialModule
  ]
})
export class MyEnrollmentModule { }
