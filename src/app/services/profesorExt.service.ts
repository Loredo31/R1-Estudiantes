import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesorExtService {

  private apiUrl = 'http://localhost:3000/api/alumnos';  // Cambia la URL si es necesario

  constructor(private http: HttpClient) { }

  // Obtener todos los alumnos
  obtenerAlumnos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);  // Devuelve todos los alumnos
  }

  // Actualizar la actividad de un alumno
  // Actualizar la actividad de un alumno
  actualizarActividad(
    alumnoId: string, 
    nombre_actividad: string | null, 
    fecha_inicio_actividad: Date | null, 
    fecha_fin_actividad: Date | null
  ): Observable<any> {
    // Preparamos los datos para enviar en la solicitud PUT
    const actividad = { 
      nombre_actividad,
      fecha_inicio_actividad,
      fecha_fin_actividad
    };
    return this.http.put(`${this.apiUrl}/actividad/${alumnoId}`, actividad);  // URL para actualizar actividad
  }
}
