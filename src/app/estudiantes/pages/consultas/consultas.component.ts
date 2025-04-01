import { Component, OnInit } from '@angular/core';
import { ObservacionService } from '../../../services/observacion.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {
  materia: string = '';
  profesor: string = '';
  observaciones: any[] = [];
  studentName: string = '';  // Usamos el nombre del estudiante en lugar del ID

  displayedColumns: string[] = ['teacherName', 'subject', 'description', 'year'];

  constructor(private observacionService: ObservacionService) {}

  ngOnInit() {
    this.obtenerStudentName();
  }

  // Función para obtener el nombre del estudiante desde el token
  obtenerStudentName() {
    const token = localStorage.getItem('auth_token'); // Obtener el token de localStorage
    
    if (!token) {
      console.error('❌ No se encontró el token en localStorage.');
      return;
    }

    try {
      console.log('🔍 Token encontrado:', token);
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el token
      console.log('📜 Payload decodificado:', payload);

      // Verificamos que el rol sea "1" o "Estudiante"
      if (payload.rol === 1 || payload.rol === "Estudiante") {
        this.studentName = payload.nombre; // Usamos el nombre del estudiante
        console.log('✅ Estudiante identificado con nombre:', this.studentName);
        this.consultar(); // Llamamos a la función para obtener las observaciones
      } else {
        console.error('⚠️ El usuario no tiene rol de estudiante. Rol detectado:', payload.rol);
      }
    } catch (error) {
      console.error('❌ Error al decodificar el token:', error);
    }
  }

  // Función para consultar las observaciones con filtros
  consultar() {
    if (!this.studentName) {
      console.warn('⚠️ No se puede consultar porque no hay nombre de estudiante.');
      return;
    }

    // Preparamos los parámetros de la consulta
    let params: any = { studentName: this.studentName };

    // Agregamos filtros si se definieron
    if (this.materia) {
      params.subject = this.materia;
    }
    
    if (this.profesor) {
      params.teacherName = this.profesor;
    }

    console.log('🔍 Enviando consulta con parámetros:', params);

    this.observacionService.consultarObservaciones(params).subscribe(
      (data) => {
        this.observaciones = data;
        console.log('✅ Observaciones recibidas:', this.observaciones);
        console.log('✅ Respuesta completa de la API:', data);
      },
      (error) => {
        console.error('❌ Error al consultar observaciones:', error);
      }
    );
  }
}
