import { Component } from '@angular/core';
import { LocalstorageService } from '../../services/localstorage.service';
import { Course } from '../../models/localstorage.model';

@Component({
  selector: 'app-learning-history',
  templateUrl: './learning-history.component.html',
  styleUrl: './learning-history.component.scss'
})
export class LearningHistoryComponent {

  userId: string | null = null;
  completedCourses: { course: Course; completedAt: string }[] = [];
  totalHours = 0;

  constructor(
    private storage: LocalstorageService
  ) { }

  ngOnInit() {
    this.userId = this.storage.getCurrentUserId();
    if (this.userId) {
      this.completedCourses = this.storage.getCompletedCoursesForUser(this.userId);
      this.totalHours = this.completedCourses
        .reduce((sum, entry) => sum + entry.course.duration, 0);
    }
  }

}
