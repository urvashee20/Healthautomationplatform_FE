import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AIPlanResponseDto, UserDashboardData } from '../models/ai-plan.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AIPlanService {
  private apiUrl = `${environment.apiUrl}/AIPlan`;
  public currentPlan = signal<AIPlanResponseDto | null>(this.loadFromStorage());

  constructor(private http: HttpClient) {}

  generatePlan(): Observable<AIPlanResponseDto> {
    return this.http.post<AIPlanResponseDto>(`${this.apiUrl}/generate-plan`, {}).pipe(
      tap(plan => {
        this.currentPlan.set(plan);
        this.saveToStorage(plan);
      })
    );
  }

  getLatestPlan(): Observable<AIPlanResponseDto> {
    return this.http.get<AIPlanResponseDto>(`${this.apiUrl}/latest-plan`).pipe(
      tap(plan => {
        this.currentPlan.set(plan);
        this.saveToStorage(plan);
      })
    );
  }

  private saveToStorage(plan: AIPlanResponseDto) {
    try {
      localStorage.setItem('health_ai_plan', JSON.stringify(plan));
    } catch (e) {
      console.error('Error saving plan to local storage', e);
    }
  }

  private loadFromStorage(): AIPlanResponseDto | null {
    try {
      const stored = localStorage.getItem('health_ai_plan');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  getUserData(): Observable<UserDashboardData> {
    return this.http.get<UserDashboardData>(this.apiUrl);
  }
}
