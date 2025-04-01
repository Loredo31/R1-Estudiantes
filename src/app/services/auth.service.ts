import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

//import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/login';  // URL de tu API de backend

  constructor(private http: HttpClient, private router: Router) { }

  login(matricula: string, password: string): Observable<any> {
    const body = { matricula, password };
    console.log('Datos enviados al backend:', { matricula, password });
    return this.http.post(this.apiUrl, body);
  }

  // Guardar el token en localStorage o en algún almacenamiento seguro
  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  // Obtener el token almacenado
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Eliminar el token (Cerrar sesión)
  logout(): void {
    localStorage.removeItem('auth_token');
    // Redirige al usuario al login
    this.router.navigate(['/']);
  }
}