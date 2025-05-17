import { Component } from '@angular/core';
import { LocalstorageService } from '../../services/localstorage.service';
import { Course } from '../../models/localstorage.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-enrollment',
  templateUrl: './my-enrollment.component.html',
  styleUrl: './my-enrollment.component.scss'
})
export class MyEnrollmentComponent {

  userId: string | null = null;
  courses: Course[] = [];

  constructor(
    private storage: LocalstorageService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.userId = this.storage.getCurrentUserId();
    if (this.userId)
      this.courses = this.storage.getEnrolledCourses(this.userId);
  }

  goToCourseDetailUrl(course: Course): void {
    this.router.navigate(['/course-details', course.id]);
  }

}
