export interface VitalSign {
  type: string;
  value: number;
  unit: string;
  timestamp: string;
}

export interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
}

export interface LabResult {
  test: string;
  result: string;
  date: string;
  status: 'normal' | 'abnormal' | 'critical';
}