export interface CreateGoalDto {
  primaryGoal?: string | null;
  secondaryGoals?: any;
  healthConditions?: string[] | null;
  isCustomGoal: boolean;
  customGoalText?: string | null;
  targetWeight?: number | null;
  durationInDays?: number | null;
  hasGymAccess?: boolean | null;
  sleepHours?: number | null;
}

export interface GoalResponseDto extends CreateGoalDto {
  id: string | number;
  createdAt: Date | string;
}
