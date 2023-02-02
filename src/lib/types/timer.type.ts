export interface Timer {
  id: string;
  name: string;
  duration: number;
}

export interface TimerFormData {
  name?: string;
  duration?: number;
}