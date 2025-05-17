import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { Course } from '../../models/localstorage.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  filteredCourses: Course[] = [];
  selectedCategory = "";
  freeOnly: boolean = false;
  sortBy: string = '';

  constructor(
    private modalService: NgbModal,
    private auth: AuthService,
    private router: Router,
    private storage: LocalstorageService
  ) { }

  ngOnInit() {
    this.applyFilter();
  }

  openModal() {
    this.modalService.open(ModalComponent);
  }

  logout() {
    this.auth.logout();
  }

  applyFilter() {
    const category = this.selectedCategory || undefined;
    const isFree = this.freeOnly ? true : undefined;
    let courses = this.storage.filterCourses(category, isFree);

    // Sorting
    if (this.sortBy === 'title') {
      courses = courses.sort((a, b) => a.title.localeCompare(b.title));
    } else if (this.sortBy === 'duration') {
      courses = courses.sort((a, b) => a.duration - b.duration);
    }

    this.filteredCourses = courses;
  }

  goToCourseDetailUrl(course: Course): void {
    this.router.navigate(['/course-details', course.id]);
  }
}
