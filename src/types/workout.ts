export interface Workout {
  _id: string;
  name: string;
  description: string;
  dateTime: string;
  state: string;
  activity: string;
  clientId: string;
  clientName: string;
  coachId: string;
  coachName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;

  // Legacy fields for backward compatibility
  id?: number | string;
  title?: string;
  date?: string;
  status?: string;
  action?: string | null;
}
