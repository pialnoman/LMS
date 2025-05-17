import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseDetailsRoutingModule } from './course-details-routing.module';
import { CourseDetailsComponent } from './course-details.component';
import { MaterialModule } from '../../material.module';


@NgModule({
  declarations: [
    CourseDetailsComponent
  ],
  imports: [
    CommonModule,
    CourseDetailsRoutingModule,
    MaterialModule
  ]
})
export class CourseDetailsModule { }
