import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getCarreras() {
    return this.http.get<any[]>(`${this.baseUrl}/carreras`);
  }

  getPuestos() {
    return this.http.get<any[]>(`${this.baseUrl}/puestos`);
  }
}
