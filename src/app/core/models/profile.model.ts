export interface UserProfileDto {
  firstName: string;
  middleName?: string | null;
  lastName: string;
  dob: Date | string;
  height?: number | null;
  weight: number;
  jobType?: string | null;
  jobName?: string | null;
  jobStartTime?: Date | string | null;
  jobEndTime?: Date | string | null;
  dailyRoutine: string;
  foodPreference: string;
  healthConditions?: string | null;
  sleepHours?: number | null;
}
