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

  private profileService = inject(ProfileService);

  ngOnInit() {
    this.IfProfileExists();
  }

  onSubmit() {
    this.profileService.createProfile(this.profile).subscribe({
      next: (res) => {
        console.log('Create profile:', res);
        alert('Profile Created Successfully');

        this.router.navigate(['/goals']);
      },
      error: (err) => {
        console.error('Error:', err);
        alert('Error while creating profile');
      }
    })
  }

  IfProfileExists() {
    this.profileService.getProfileById().subscribe({
      next: (res) => {
        console.log('Profile exists:', res);
        if (res.exists && res.profile) {
          this.profile = res.profile;
          //this.router.navigate(['/goals']);
        }
      },
      error: (err) => {
        console.error('Error checking profile:', err);
      }
    });
  }

}
