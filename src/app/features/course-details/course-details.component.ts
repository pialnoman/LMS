import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalstorageService } from '../../services/localstorage.service';
import { Course, Enrollment } from '../../models/localstorage.model';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss'
})
export class CourseDetailsComponent {

  course: Course | undefined;
  userId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private store: LocalstorageService
  ) { }

  ngOnInit() {
    this.userId = this.store.getCurrentUserId();
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId)
      this.getCourseDetails(courseId);
  }

  getCourseDetails(id: string) {
    this.course = this.store.getSingleItem(id);
  }

  getPrerequisites(id: string) {
    return this.store.getSingleItem(id)?.title;
  }

  enrollWithCourse(course: Course) {
    console.log(this.userId)
    if (this.store.isEnrolled(this.userId, course.id)) { // check is enrolled or not
      alert('You are already enrolled in this course.');
      return;
    }

    if (!this.store.completedPrerequisites(this.userId, course.prerequisites)) { // check has met prerequisite or not
      alert('You must enroll in (or complete) all prerequisite courses first.');
      return;
    }

    if (this.userId) {
      const enrollment: Enrollment = {
        userId: this.userId,
        courseId: course.id,
        status: 'enrolled',
        progress: 0,
        enrolledAt: new Date().toISOString()
      };

      const ok = this.store.updateEnrollment(enrollment);
      if (ok) {
        alert(`Successfully enrolled in “${course.title}”.`);
      } else {
        alert('Enrollment failed.');
      }
    }
  }

}
