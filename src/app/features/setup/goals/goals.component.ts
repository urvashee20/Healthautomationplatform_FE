import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoalService } from '../../../core/services/goal.service';
import { AIPlanService } from '../../../core/services/ai-plan.service';
import { CreateGoalDto } from '../../../core/models/goal.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './goals.component.html',
  styleUrl: './goals.component.css'
})
export class GoalsComponent {
  private router = inject(Router);
  private goalService = inject(GoalService);
  private aiPlanService = inject(AIPlanService);
  
  selectedPrimaryGoal = signal<string>('');
  sleepValue = signal<number>(7);
  selectedConditions = signal<Set<string>>(new Set());
  isLoading = signal<boolean>(false);
  
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
    try {
      this.isLoading.set(true);
      
      const primary = this.selectedPrimaryGoal();
      const conditions = Array.from(this.selectedConditions());
      
      const goalDto: CreateGoalDto = {
        primaryGoal: primary,
        isCustomGoal: primary === 'custom',
        healthConditions: conditions.length > 0 ? conditions : null,
        sleepHours: this.sleepValue()
      };

      await firstValueFrom(this.goalService.setGoal(goalDto));
      await firstValueFrom(this.aiPlanService.generatePlan());
      
      this.router.navigate(['/dashboard']);
    } catch (e) {
      console.error('Error generating plan:', e);
      // Fallback in case of failure so the user isn't stuck forever
      this.router.navigate(['/dashboard']);
    } finally {
      this.isLoading.set(false);
    }
  }

  skipPlan() {
    this.router.navigate(['/dashboard']);
  }
}
