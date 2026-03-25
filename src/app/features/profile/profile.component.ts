import { Component, inject } from '@angular/core';
import { UserProfileDto } from '../../core/models/profile.model';
import { ProfileService } from '../../core/services/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profile: UserProfileDto = {
    firstName: '',
    middleName: null,
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

  onsubmit(){
    this.profileService.createProfile(this.profile).subscribe({
      next:(res) => {
        console.log('Create profile:',res);
        alert('Profile Created Successfully');
      },
      error: (err) => {
        console.error('Error:', err);
        alert('Error while creating profile');
      }
    })
  }
}
