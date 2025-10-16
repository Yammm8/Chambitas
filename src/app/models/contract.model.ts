export interface Contract {
  id: number;
  postTitle: string;      // Título del trabajo
  workerName: string;     // Nombre del trabajador
  category: string;       // Categoría del trabajo
  pay: number;            // Pago
  startDate: string;      // Fecha de inicio
  endDate: string;        // Fecha de fin
  createdAt: string;      // Fecha de creación
  status: 'Activo' | 'Completo' | 'Cancelado'; // Estado del contrato
}
