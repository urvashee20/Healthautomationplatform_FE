import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AIPlanService } from '../../core/services/ai-plan.service';
import { UserProfileDto } from '../../core/models/profile.model';
import { CreateGoalDto } from '../../core/models/goal.model';
import { AIPlanDto } from '../../core/models/ai-plan.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-overview',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-overview.component.html',
  styleUrl: './user-overview.component.css'
})
export class UserOverviewComponent implements OnInit {
  private aiPlanService = inject(AIPlanService);

  profile = signal<UserProfileDto | null>(null);
  goal = signal<CreateGoalDto | null>(null);
  plan = signal<AIPlanDto | null>(null);
  isLoading = signal<boolean>(true);

  primaryGoalMap: Record<string, { label: string; icon: string }> = {
    'weight_loss': { label: 'Lose Weight', icon: '⚖️' },
    'muscle':     { label: 'Gain Muscle', icon: '💪' },
    'health':     { label: 'Stay Healthy', icon: '🍏' },
    'energy':     { label: 'Improve Energy', icon: '⚡' },
    'sleep':      { label: 'Better Sleep', icon: '😴' },
    'belly_fat':  { label: 'Reduce Belly Fat', icon: '🏃' },
    'condition':  { label: 'Manage Condition', icon: '⚕️' },
    'custom':     { label: 'Custom Goal', icon: '🎯' }
  };

  async ngOnInit() {
    try {
      const data = await firstValueFrom(this.aiPlanService.getUserData());
      if (data.profile) this.profile.set(data.profile);
      if (data.goal) this.goal.set(data.goal);
      if (data.plan) this.plan.set(data.plan);
    } catch (e) {
      console.error('Error loading user overview:', e);
    } finally {
      this.isLoading.set(false);
    }
  }

  getInitials(): string {
    const p = this.profile();
    if (!p) return 'U';
    return ((p.firstName?.[0] || '') + (p.lastName?.[0] || '')).toUpperCase() || 'U';
  }

  getFullName(): string {
    const p = this.profile();
    if (!p) return 'User';
    return [p.firstName, p.lastName].filter(Boolean).join(' ') || 'User';
  }

  getAge(): string {
    const p = this.profile();
    if (!p || !p.dob) return 'N/A';
    const dob = new Date(p.dob);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
    return `${age} Years`;
  }

  getBmi(): string {
    const p = this.profile();
    if (p && p.weight && p.height) {
      const h = p.height / 100;
      return (p.weight / (h * h)).toFixed(1);
    }
    return 'N/A';
  }

  getPrimaryGoalDisplay(): { label: string; icon: string } {
    const g = this.goal();
    if (!g || !g.primaryGoal) return { label: 'Not Set', icon: '❓' };
    return this.primaryGoalMap[g.primaryGoal] || { label: g.primaryGoal, icon: '🎯' };
  }

  getSecondaryGoals(): string[] {
    const g = this.goal();
    if (!g || !g.secondaryGoals) return [];
    
    const goals = g.secondaryGoals;
    if (typeof goals === 'string') {
      try {
        const parsed = JSON.parse(goals);
        if (Array.isArray(parsed)) return parsed;
        return [goals];
      } catch {
        return [goals];
      }
    }
    if (Array.isArray(goals)) return goals;
    return [];
  }

  getHealthConditions(): string[] {
    const g = this.goal();
    if (!g || !g.healthConditions) return [];
    
    const conditions = g.healthConditions;
    if (typeof conditions === 'string') {
      try {
        const parsed = JSON.parse(conditions);
        if (Array.isArray(parsed)) return parsed;
        return [conditions];
      } catch {
        return [conditions];
      }
    }
    if (Array.isArray(conditions)) return conditions;
    return [];
  }

  formatTime(time: Date | string | null | undefined): string {
    if (!time) return 'N/A';
    const d = new Date(time);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}

