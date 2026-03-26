import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HealthService {
  private userProfile = signal<any>(null);
  private userGoals = signal<any>(null);
  private healthPlan = signal<any>(null);

  constructor() {}

  // saveProfile(profileData: any) {
  //   console.log('Profile saved', profileData);
  //   this.userProfile.set(profileData);
  //   return Promise.resolve(true);
  // }

  // getProfile() {
  //   return this.userProfile();
  // }

  // saveGoals(goalsData: any) {
  //   // Mock API call
  //   console.log('Goals saved', goalsData);
  //   this.userGoals.set(goalsData);
  //   return Promise.resolve(true);
  // }

  // getGoals() {
  //   return this.userGoals();
  // }

  // generatePlan() {
  //   // Mock API response based on goals
  //   const plan = {
  //     diet: ['Breakfast: Poha', 'Lunch: Dal & Rice', 'Dinner: Salad'],
  //     workout: ['15-min HIIT', 'Stretching'],
  //     water: ['Aim for 2.5L daily', 'Keep a bottle nearby'],
  //     sleep: ['Aim for 8 Hours', 'Avoid screens before bed']
  //   };
  //   this.healthPlan.set(plan);
  //   return Promise.resolve(plan);
  // }

  // getPlan() {
  //   return this.healthPlan();
  // }
}
