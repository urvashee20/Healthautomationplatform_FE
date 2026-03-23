import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateGoalDto, GoalResponseDto } from '../models/goal.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  private apiUrl = `${environment.apiUrl}/Goal`;

  constructor(private http: HttpClient) {}

  setGoal(goal: CreateGoalDto): Observable<any> {
    return this.http.post(this.apiUrl, goal);
  }

  getGoal(): Observable<GoalResponseDto | string> {
    return this.http.get<GoalResponseDto | string>(this.apiUrl);
  }
}
