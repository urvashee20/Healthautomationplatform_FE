import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserProfileDto } from '../../../core/models/profile.model';
import { ProfileService } from '../../../core/services/profile.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-setup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile-setup.component.html',
  styleUrl: './profile-setup.component.css'
})
export class ProfileSetupComponent {
  private router = inject(Router);

  profile: UserProfileDto = {
    firstName: '',
    lastName: '',
    dob: '',
    height: null,
    weight: 0,
    jobType: null,
    jobName: null,
    jobStartTime: null,
    jobEndTime: null,
    dailyRoutine: '',
    foodPreference: '',
    healthConditions: null,
    sleepHours: null,
  };

  isEditMode = false;

  private profileService = inject(ProfileService);

  ngOnInit() {
    this.IfProfileExists();
  }

  onSubmit() {
    const action = this.isEditMode 
      ? this.profileService.updateProfile(this.profile) 
      : this.profileService.createProfile(this.profile);

    action.subscribe({
      next: (res) => {
        console.log(this.isEditMode ? 'Update profile:' : 'Create profile:', res);
        alert(this.isEditMode ? 'Profile Updated Successfully' : 'Profile Created Successfully');
        this.router.navigate(['/goals']);
      },
      error: (err) => {
        console.error('Error:', err);
        alert('Error while saving profile');
      }
    });
  }

  IfProfileExists() {
    this.profileService.getProfileById().subscribe({
      next: (res) => {
        console.log('Profile exists:', res);
        if (res.exists && res.profile) {
          this.isEditMode = true;
          this.profile = { ...res.profile };
          
          // Format date for <input type="date"> (yyyy-MM-dd)
          if (this.profile.dob) {
            const date = new Date(this.profile.dob);
            this.profile.dob = date.toISOString().split('T')[0];
          }
        }
      },
      error: (err) => {
        console.error('Error checking profile:', err);
      }
    });
  }

}
