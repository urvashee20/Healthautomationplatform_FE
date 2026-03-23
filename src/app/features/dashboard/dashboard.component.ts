import { Component, inject, OnInit, signal } from '@angular/core';
import { HealthService } from '../../core/services/health.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private healthService = inject(HealthService);
  
  planData = signal<any>(null);

  async ngOnInit() {
    const plan = await this.healthService.getPlan() || await this.healthService.generatePlan();
    this.planData.set(plan);
  }
}
