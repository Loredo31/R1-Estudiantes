import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosEscolaresService {
  private apiUrl = 'http://localhost:3000/api/serviciosEscolares'; 

  constructor(private http: HttpClient) {}

  getServiciosEscolares(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }

  getServicioEscolarById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createServicioEscolar(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, data);
  }

  updateServicioEscolar(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteServicioEscolar(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
