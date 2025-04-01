import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../../../services/alumno.service'; // Importamos el servicio correcto

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user: any = { 
    telefonos: [], 
    correos: [], 
    domicilio: {}, 
    tutor: { domicilio: {}, telefonos: [], correos: [] }
  };  // Inicializamos con valores predeterminados

  constructor(private alumnoService: AlumnoService) { }

  ngOnInit(): void {
    // Obtener el ID del estudiante desde localStorage
    const alumnoId = localStorage.getItem('estudianteId');  // Cambié a 'estudianteId'

    if (alumnoId) {
      // Usamos el servicio para obtener los datos del alumno por su ID
      this.alumnoService.obtenerAlumnoPorId(alumnoId).subscribe(
        (data: any) => {  // Especificamos el tipo de data
          // Aseguramos que telefonos y correos sean siempre arrays
          this.user = { 
            ...data, 
            telefonos: Array.isArray(data.telefonos) ? data.telefonos : [],  // Asegurarse de que telefonos sea un array
            correos: Array.isArray(data.correos) ? data.correos : [],  // Asegurarse de que correos sea un array
            domicilio: data.domicilio || {},
            tutor: data.tutores && data.tutores[0] || { domicilio: {}, telefonos: [], correos: [] }
          };
        },
        (error: any) => {  // Especificamos el tipo de error
          console.error('Error al obtener los datos del estudiante', error);
        }
      );
    } else {
      console.log('ID del estudiante no encontrado');
    }
  }
}
