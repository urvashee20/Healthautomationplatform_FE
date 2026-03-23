import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AIPlanResponseDto } from '../models/ai-plan.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AIPlanService {
  private apiUrl = `${environment.apiUrl}/AIPlan`;

  constructor(private http: HttpClient) {}

  generatePlan(): Observable<AIPlanResponseDto> {
    return this.http.post<AIPlanResponseDto>(`${this.apiUrl}/generate-plan`, {});
  }

  getLatestPlan(): Observable<AIPlanResponseDto> {
    return this.http.get<AIPlanResponseDto>(`${this.apiUrl}/latest-plan`);
  }
}
