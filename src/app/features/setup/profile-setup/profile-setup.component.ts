import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HealthService } from '../../../core/services/health.service';

@Component({
  selector: 'app-profile-setup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile-setup.component.html',
  styleUrl: './profile-setup.component.css'
})
export class ProfileSetupComponent {
  private router = inject(Router);
  private healthService = inject(HealthService);

  profile: any = {
    firstName: '',
    lastName: '',
    dob: '',
    height: null,
    weight: null,
    jobType: '',
    foodPref: '',
    conditions: '',
    sleep: null,
    routine: ''
  };

  async onSubmit(event: Event) {
    event.preventDefault();
    await this.healthService.saveProfile(this.profile);
    this.router.navigate(['/goals']);
  }
}
