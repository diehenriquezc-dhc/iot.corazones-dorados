
export interface PatientData {
  patientId: string;
  lastMovementTimestamp: string;
  currentRoom: string;
  isMoving: boolean;
  activityLevel: 'normal' | 'low' | 'none';
  fallDetected: boolean;
  dailyStepCount: number;
  movementHistory: Array<'normal' | 'low' | 'none'>;
}
