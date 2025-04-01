import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../../../services/alumno.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  studentName: string = '';

  constructor(private AlumnoService: AlumnoService) { }
  
    ngOnInit(): void {
      // Obtener el ID del estudiante desde localStorage o cualquier otra fuente
      const alumnoId = localStorage.getItem('estudianteId');
  
      if (alumnoId) {
        // Llamar al servicio para obtener los datos del alumno
        this.AlumnoService.obtenerAlumnoPorId(alumnoId).subscribe(
          (data) => {
            // Asignar el nombre del alumno desde la respuesta del API
            this.studentName = `${data.nombre} ${data.apellido_paterno} ${data.apellido_materno}`;
          },
          (error) => {
            console.error('Error al obtener los datos del estudiante', error);
          }
        );
      } else {
        console.log('ID del estudiante no encontrado');
      }
    }
}
