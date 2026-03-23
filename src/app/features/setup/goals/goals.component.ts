import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HealthService } from '../../../core/services/health.service';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './goals.component.html',
  styleUrl: './goals.component.css'
})
export class GoalsComponent {
  private router = inject(Router);
  private healthService = inject(HealthService);
  
  selectedPrimaryGoal = signal<string>('');
  sleepValue = signal<number>(7);
  selectedConditions = signal<Set<string>>(new Set());
  
  primaryGoals = [
    { id: 'weight_loss', label: 'Lose weight', icon: '⚖️' },
    { id: 'muscle', label: 'Gain muscle', icon: '💪' },
    { id: 'health', label: 'Stay healthy', icon: '🍏' },
    { id: 'energy', label: 'Improve energy', icon: '⚡' },
    { id: 'sleep', label: 'Better sleep', icon: '😴' },
    { id: 'belly_fat', label: 'Reduce belly fat', icon: '🏃' },
    { id: 'condition', label: 'Manage condition', icon: '⚕️' },
    { id: 'custom', label: 'Custom goal', icon: '🎯' }
  ];
  
  conditionsList = ['Diabetes', 'Blood Pressure (BP)', 'Thyroid', 'Cholesterol', 'PCOS', 'Other'];
  
  secondaryGoals = [
    'Better sleep',
    'Improve stamina',
    'Reduce stress',
    'Eat healthier',
    'Increase activity',
    'Reduce sugar cravings'
  ];

  selectPrimaryGoal(id: string) {
    this.selectedPrimaryGoal.set(id);
  }
  
  toggleCondition(cond: string) {
    const set = new Set(this.selectedConditions());
    if (set.has(cond)) {
      set.delete(cond);
    } else {
      set.add(cond);
    }
    this.selectedConditions.set(set);
  }
  
  hasOtherCondition(): boolean {
    return this.selectedConditions().has('Other');
  }

  updateSleep(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.sleepValue.set(parseInt(val, 10));
  }

  async generatePlan() {
    await this.healthService.saveGoals({
      primary: this.selectedPrimaryGoal(),
      conditions: Array.from(this.selectedConditions()),
      sleep: this.sleepValue()
    });
    this.router.navigate(['/dashboard']);
  }

  skipPlan() {
    this.router.navigate(['/dashboard']);
  }
}
