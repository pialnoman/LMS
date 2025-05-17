import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningHistoryRoutingModule } from './learning-history-routing.module';
import { LearningHistoryComponent } from './learning-history.component';
import { MaterialModule } from '../../material.module';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    LearningHistoryComponent
  ],
  imports: [
    CommonModule,
    LearningHistoryRoutingModule,
    MaterialModule,
    MatTableModule
  ]
})
export class LearningHistoryModule { }
