export interface Application {
  id: number;
  title: string;
  employer: string;
  category: string;
  pay: number;
  dateApplied: string;
  status: 'Pendiente' | 'Aceptada' | 'Rechazada';
}
