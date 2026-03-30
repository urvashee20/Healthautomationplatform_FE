export interface AIPlanResponseDto {
  id: number;
  dietPlan: string;
  workoutPlan: string;
  waterPlan: string;
  sleepPlan: string;
  createdAt: Date | string;
}

export interface AIPlanDto {
  dietPlan: string;
  workoutPlan: string;
  waterPlan: string;
  sleepPlan: string;
}

export interface UserDashboardData {
  profile: import('./profile.model').UserProfileDto | null;
  goal: import('./goal.model').CreateGoalDto | null;
  plan: AIPlanResponseDto | null;
}

