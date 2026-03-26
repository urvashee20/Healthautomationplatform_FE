import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GoalService } from '../../core/services/goal.service';
import { GoalResponseDto } from '../../core/models/goal.model';
import { AIPlanService } from '../../core/services/ai-plan.service';
import { ProfileService } from '../../core/services/profile.service';
import { AuthService } from '../../core/services/auth.service';
import { AIPlanResponseDto } from '../../core/models/ai-plan.model';
import { UserProfileDto } from '../../core/models/profile.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
 // private healthService = inject(HealthService);
  private aiPlanService = inject(AIPlanService);
  private profileService = inject(ProfileService);
  private authService = inject(AuthService);
  private goalService = inject(GoalService);
  
  planData = signal<any>(null);
  profileData = signal<UserProfileDto | null>(null);
  goalData = signal<GoalResponseDto | null>(null);
  isLoading = signal<boolean>(false);

  async ngOnInit() {
    this.loadProfile();
    this.loadGoal();
    
    try {
      this.isLoading.set(true);
      let targetPlan = this.aiPlanService.currentPlan();
      
      if (!targetPlan) {
        targetPlan = await firstValueFrom(this.aiPlanService.generatePlan());
      }
      
      if (targetPlan) {
        this.mapAndSetPlan(targetPlan);
      } 
      // else {
      //   await this.loadMockPlan();
      // }
    } catch (e) {
      console.error('Error fetching plan:', e);
      // await this.loadMockPlan();
    } finally {
      this.isLoading.set(false);
    }
  }

  // private async loadMockPlan() {
  //   const mockPlan = await this.healthService.getPlan() || await this.healthService.generatePlan();
  //   this.planData.set(mockPlan);
  // }

  private mapAndSetPlan(planRaw: AIPlanResponseDto) {
    const parseText = (text: string | undefined | null) => {
      if (!text) return [];
      // Handle literal \\n in JSON strings and real newlines
      return text.replace(/\\n/g, '\n').split('\n').map(s => s.trim()).filter(Boolean)
      .map(s => s.replace(/^(\*|\d+\.)\s*/, '')); // remove *, 1. etc;
    };

    const plan = {
      diet: parseText(planRaw.dietPlan),
      workout: parseText(planRaw.workoutPlan),
      water: parseText(planRaw.waterPlan),
      sleep: parseText(planRaw.sleepPlan)
    };
    
    if (plan.water.length === 0) plan.water = ['N/A'];
    if (plan.sleep.length === 0) plan.sleep = ['N/A'];

    this.planData.set(plan);
  }

  async regeneratePlan() {
    try {
      this.isLoading.set(true);
      const newPlan = await firstValueFrom(this.aiPlanService.generatePlan());
      if (newPlan) {
        this.mapAndSetPlan(newPlan);
      }
    } catch (e) {
      console.error('Error regenerating plan:', e);
    } finally {
      this.isLoading.set(false);
    }
  }

  private async loadProfile() {
    try {
      const response = await firstValueFrom(this.profileService.getProfileById());
      if (response && response.profile) {
        this.profileData.set(response.profile);
      }
    } catch (e) {
      console.error('Error fetching profile data:', e);
    }
  }

  private async loadGoal() {
    try {
      const response = await firstValueFrom(this.goalService.getGoal());
      // The backend returns a GoalResponseDto or string if "Goal not found for this user."
      if (response && typeof response !== 'string') {
        this.goalData.set(response as GoalResponseDto);
      }
    } catch (e) {
      console.error('Error fetching goal data:', e);
    }
  }

  getBmi(): string {
    const p = this.profileData();
    if (p && p.weight && p.height) {
      const heightInMeters = p.height / 100;
      const bmi = p.weight / (heightInMeters * heightInMeters);
      return bmi.toFixed(1);
    }
    return 'N/A';
  }

  getPrimaryGoalLabel(): string {
    const goalId = this.goalData()?.primaryGoal;
    if (!goalId) return 'Health Focus';
    const goalMap: Record<string, string> = {
      'weight_loss': 'Lose weight ⚖️',
      'muscle': 'Gain muscle 💪',
      'health': 'Stay healthy 🍏',
      'energy': 'Improve energy ⚡',
      'sleep': 'Better sleep 😴',
      'belly_fat': 'Reduce belly fat 🏃',
      'condition': 'Manage condition ⚕️',
      'custom': 'Custom goal 🎯'
    };
    return goalMap[goalId] || goalId;
  }

  getSecondaryGoals(): string[] {
    return this.goalData()?.secondaryGoals || [];
  }
}

