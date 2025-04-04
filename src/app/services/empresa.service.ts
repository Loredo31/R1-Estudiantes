import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private apiUrl = 'http://localhost:3000/api/empresas'; 

  constructor(private http: HttpClient, private router: Router) {} 

  getEmpresas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }

  getEmpresaById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createEmpresa(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, data);
  }

  updateEmpresa(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteEmpresa(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  
  logout(): void {
    localStorage.removeItem('token'); 
    this.router.navigate(['/login']); 
    console.log('Sesión cerrada');
  }
}
