import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearningHistoryComponent } from './learning-history.component';

const routes: Routes = [{ path: '', component: LearningHistoryComponent },];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningHistoryRoutingModule { }
