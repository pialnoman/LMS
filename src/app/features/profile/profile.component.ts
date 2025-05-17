import { Component } from '@angular/core';
import { LocalstorageService } from '../../services/localstorage.service';
import { User } from '../../models/localstorage.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  userForm!: FormGroup;
  showEditForm: boolean = false;

  selectedCategoriesArray: string[] = [];
  selectedCategory = '';

  userId: string | null = null;
  userDetails: User | null | undefined;

  constructor(
    private storage: LocalstorageService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.userId = this.storage.getCurrentUserId();
    if (this.userId)
      this.userDetails = this.storage.getUserDetails();
    console.log(this.userDetails)

    if (this.userDetails) {
      this.populateForm(this.userDetails);
    }
    if (this.selectedCategory) {
      this.selectedCategoriesArray = this.selectedCategory.split(',').map(s => s.trim());
    }
  }

  populateForm(userDetails: User) {
    this.userForm = this.fb.group({
      name: [userDetails.name, [Validators.required]],
      email: [userDetails.email, [Validators.required, Validators.email]],
      preferredCategories: [userDetails.preferences.preferredCategories || []],
      notifications: [userDetails.preferences.notifications]
    });
  }

  editUser() {
    this.showEditForm = true;
    if (this.userDetails) {
      this.populateForm(this.userDetails);
    }
  }

  onCategoriesChanged(): void {
    // Join array into comma‑separated string
    this.selectedCategory = this.selectedCategoriesArray.join(', ');
  }


  save(): void {
    if (this.userForm.invalid) return;

    const formValue = this.userForm.value;
    const updatedUser: User = {
      userId: this.storage.getCurrentUserId()!,
      name: formValue.name,
      email: formValue.email,
      preferences: {
        preferredCategories: formValue.preferredCategories,
        notifications: formValue.notifications
      }
    };

    this.storage.updateUser(updatedUser);
    if (this.userId)
      this.userDetails = this.storage.getUserDetails();
    this.showEditForm = false;
    alert('User profile updated!');
  }

}
