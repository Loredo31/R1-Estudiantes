import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private apiUrl = 'http://localhost:3000/api/solicitudes'; // Cambia esta URL por la de tu API backend

  constructor(private http: HttpClient) {}

  // Método para obtener todas las solicitudes
  obtenerSolicitudes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Método para registrar una nueva solicitud
  registrarSolicitud(solicitud: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, solicitud);
  }

  // Método para editar una solicitud existente
  editarSolicitud(id: string, solicitud: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, solicitud);
  }

  // Método para eliminar una solicitud
  eliminarSolicitud(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
