// observacion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservacionService {

  private apiUrl = 'http://localhost:3000/api'; // Cambia esto por tu ruta de API

  constructor(private http: HttpClient) {}

  // Obtener estudiantes
  obtenerEstudiantes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/alumnos`);
  }

  // Obtener observaciones por profesor
  obtenerObservacionesPorProfesor(teacherId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/observaciones/profesor/${teacherId}`);
  }

  // Agregar una nueva observación
  agregarObservacion(observacion: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/observaciones`, observacion);
  }

  // Método para consultar observaciones filtradas
  consultarObservaciones(params: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/observaciones`, { params });
    
  }
}
