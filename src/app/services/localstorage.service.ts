import { Injectable } from '@angular/core';
import { Course, Enrollment, LocalStorageData, User } from '../models/localstorage.model';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  private readonly key = "lmsData";

  constructor() { }

  SetItem(data: LocalStorageData) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  getItem(): LocalStorageData | null {
    const result = localStorage.getItem(this.key);
    return result ? JSON.parse(result) : null;
  }

  getSingleItem(id: string) {
    const data = this.getItem();
    return data?.courses.find(item => item.id === id);
  }

  setUser(user: User): void {
    const data = this.getItem() ?? { courses: [], enrollments: [], user: user };
    data.user = user;
    this.SetItem(data);
  }

  getCurrentUserId(): string | null {
    const data = this.getItem();
    return data?.user?.userId ?? null;
  }

  getUserDetails(): User | null {
    const data = this.getItem();
    return data?.user ?? null;
  }

  updateUser(updatedUser: User): void {
    const data = this.getItem();
    if (!data) return;

    data.user = updatedUser;
    this.SetItem(data);
  }

  storeData() {
    if (!localStorage.getItem(this.key)) {
      const data: LocalStorageData = {
        user: {
          userId: "b5a3f4b8-d41e-4e9c-8e5b-f7b203c91cf2",
          name: "Alice Johnson",
          email: "alice.johnson@example.com",
          preferences: {
            preferredCategories: ["Programming", "Business"],
            notifications: true,
          },
        },
        courses: [
          {
            id: "c1f3a138-8b8b-41f3-9861-b1741f51918b",
            title: "Python for Beginners",
            description: "An introduction to Python programming with practical examples.",
            category: "Programming",
            isFree: true,
            prerequisites: [],
            duration: 6,
          },
          {
            id: "b99f7a69-19e6-4f3f-96b6-7d4f3d7c8b8d",
            title: "Full-Stack Web Development",
            description: "Become a full-stack developer with HTML, CSS, JavaScript, and Node.js.",
            category: "Programming",
            isFree: false,
            prerequisites: ["c1f3a138-8b8b-41f3-9861-b1741f51918b"],
            duration: 12,
          },
          {
            id: "58e83e22-9e70-4b96-bb5c-61ea91ad49b4",
            title: "Project Management Essentials",
            description: "Learn the fundamentals of managing projects successfully.",
            category: "Business",
            isFree: true,
            prerequisites: [],
            duration: 5,
          },
          {
            id: "f2adad64-88c5-4e7b-81a9-60ce8dfdb42b",
            title: "Data Science & Machine Learning",
            description: "Explore data science concepts with hands-on machine learning exercises.",
            category: "Programming",
            isFree: false,
            prerequisites: ["c1f3a138-8b8b-41f3-9861-b1741f51918b"],
            duration: 10,
          },
          {
            id: "4c761fa1-8415-426b-bdd7-812b4462cdd1",
            title: "Digital Marketing Mastery",
            description: "A complete guide to SEO, content marketing, and social media.",
            category: "Marketing",
            isFree: true,
            prerequisites: [],
            duration: 7,
          },
        ],
        enrollments: [],
      }

      localStorage.setItem(this.key, JSON.stringify(data));
    }
  }

  editEnrollment(enrollment: Enrollment) {
    const data = this.getItem();

    if (!data) return;

    const index = data.enrollments.findIndex(item =>
      item.userId === enrollment.userId && item.courseId === enrollment.courseId
    );

    if (index > -1) {
      data.enrollments[index] = enrollment;
    } else {
      data.enrollments.push(enrollment)
    }

    this.SetItem(data);
  }

  filterCourses(category?: string, isFree?: boolean): Course[] {
    const data = this.getItem();
    if (!data) return [];

    return data.courses.filter(course => {
      const foundCategory = category ? course.category === category : true;
      const foundIsFree = isFree !== undefined ? course.isFree === isFree : true;
      return foundCategory && foundIsFree;
    });
  }

  isEnrolled(userId: string | null, courseId: string): boolean {
    const data = this.getItem();
    return !!data?.enrollments.find(
      e => e.userId === userId && e.courseId === courseId
    );
  }

  completedPrerequisites(userId: string | null, prerequisites: string[]): boolean {
    const data = this.getItem();
    if (!data) return false;

    return prerequisites.every(prereqId =>
      data.enrollments.find(
        e =>
          e.userId === userId &&
          e.courseId === prereqId &&
          (e.status === 'enrolled' || e.status === 'completed')
      )
    );
  }

  updateEnrollment(enrollment: Enrollment): boolean {
    const data = this.getItem();
    if (!data) return false;

    if (this.isEnrolled(enrollment.userId, enrollment.courseId)) {
      return false;                             // duplicate – do nothing
    }

    data.enrollments.push(enrollment);
    this.SetItem(data);
    return true;                                // success
  }

  getEnrolledCourses(userId: string): Course[] {
    const data = this.getItem();
    if (!data) return [];

    const enrolledCourseIds = data.enrollments
      .filter(e => e.userId === userId)
      .map(e => e.courseId);

    return data.courses.filter(course => enrolledCourseIds.includes(course.id));
  }

  getCompletedCoursesForUser(userId: string): { course: Course; completedAt: string }[] {
    const data = this.getItem();
    if (!data) return [];

    return data.enrollments
      .filter(e => e.userId === userId && e.status === 'completed')
      .map(e => {
        const course = data.courses.find(c => c.id === e.courseId)!;
        return { course, completedAt: e.completedAt! };
      });
  }

}
