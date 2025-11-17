
import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientData } from './patient-data.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class AppComponent {
  
  patientData = signal<PatientData>({
    "patientId": "pat-9f8e7d6c-5b4a-4c3d-2e1f-0a9b8c7d6e5f",
    "lastMovementTimestamp": "2025-11-17T10:14:30.456Z",
    "currentRoom": "Sala de Estar",
    "isMoving": true,
    "activityLevel": "normal",
    "fallDetected": false,
    "dailyStepCount": 1450,
    "movementHistory": ["normal", "normal", "low", "none", "low", "normal", "normal", "low", "normal", "normal", "low", "none", "low", "normal", "normal", "low", "normal", "normal", "low", "none", "low", "normal", "normal", "low"]
  });

  lightLevel = signal<number>(75); // Mock light sensor value (0-100)
  
  lastSeen = computed(() => {
    const date = new Date(this.patientData().lastMovementTimestamp);
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  });

  dailyStepGoal = 3000;
  stepProgress = computed(() => {
    return Math.min(100, (this.patientData().dailyStepCount / this.dailyStepGoal) * 100);
  });
  
  isLightOn = computed(() => this.lightLevel() > 10);

  updateLightLevel(event: Event) {
    const target = event.target as HTMLInputElement;
    this.lightLevel.set(Number(target.value));
  }

  getActivityBarClass(level: 'normal' | 'low' | 'none'): string {
    switch (level) {
      case 'normal':
        return 'bg-teal-500';
      case 'low':
        return 'bg-amber-500';
      case 'none':
        return 'bg-slate-400';
      default:
        return 'bg-slate-300';
    }
  }

  getActivityBarHeight(level: 'normal' | 'low' | 'none'): number {
    switch (level) {
      case 'normal':
        return 100;
      case 'low':
        return 50;
      case 'none':
        return 10;
      default:
        return 0;
    }
  }
}
