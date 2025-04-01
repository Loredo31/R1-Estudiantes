import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private apiUrl = 'http://localhost:3000/api/alumnos';  

  constructor(private http: HttpClient) { }

  
  // Crear un nuevo alumno
  registrarAlumno(alumno: any): Observable<any> {
    return this.http.post(this.apiUrl, alumno);
  }

   // Obtener todos los alumnos
   obtenerAlumnos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener un alumno por ID
  obtenerAlumnoPorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Obtener solo los alumnos con rol 2 (dados de baja temporal)
  obtenerAlumnosBaja(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?rol=2`);
  }

  // Actualizar un alumno por ID
  actualizarAlumno(id: string, alumno: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, alumno);
  }

  // Restaurar alumno (cambiar rol de 2 a 1)
  restaurarAlumno(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/restore`, { rol: 1 });
  }

  // Eliminar un alumno por ID
  eliminarAlumno(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}