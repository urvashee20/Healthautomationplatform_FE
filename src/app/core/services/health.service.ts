import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HealthService {
  private userProfile = signal<any>(null);
  private userGoals = signal<any>(null);
  private healthPlan = signal<any>(null);

  constructor() {}

  // Profile API logic
  saveProfile(profileData: any) {
    // Mock API call
    console.log('Profile saved', profileData);
    this.userProfile.set(profileData);
    return Promise.resolve(true);
  }

  getProfile() {
    return this.userProfile();
  }

  // Goals API logic
  saveGoals(goalsData: any) {
    // Mock API call
    console.log('Goals saved', goalsData);
    this.userGoals.set(goalsData);
    return Promise.resolve(true);
  }

  getGoals() {
    return this.userGoals();
  }

  // Plan Generation
  generatePlan() {
    // Mock API response based on goals
    const plan = {
      diet: ['Breakfast: Poha', 'Lunch: Dal & Rice', 'Dinner: Salad'],
      workout: ['15-min HIIT', 'Stretching'],
      water: '2.5L',
      sleep: '8 Hours'
    };
    this.healthPlan.set(plan);
    return Promise.resolve(plan);
  }

  getPlan() {
    return this.healthPlan();
  }
}
