import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../../../services/alumno.service'; // Importamos el servicio correcto

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {
  user: any = { 
    telefonos: [], 
    correos: [], 
    domicilio: {}, 
    tutor: { domicilio: {}, telefonos: [], correos: [] },
    nuevaContrasena: '' // Agregamos el campo para la nueva contraseña
  };  // Inicializamos con valores predeterminados

  constructor(private alumnoService: AlumnoService) { }

  ngOnInit(): void {
    // Obtener el ID del estudiante desde el localStorage
    const alumnoId = localStorage.getItem('estudianteId');  // Verifica si esta clave existe en localStorage

    if (alumnoId) {
      // Usamos el servicio para obtener los datos del alumno por su ID
      this.alumnoService.obtenerAlumnoPorId(alumnoId).subscribe(
        (data: any) => {  // Especificamos el tipo de data
          // Aseguramos que telefonos y correos sean siempre arrays
          this.user = { 
            ...data, 
            telefonos: Array.isArray(data.telefonos) ? data.telefonos : [],  
            correos: Array.isArray(data.correos) ? data.correos : [],  
            domicilio: data.domicilio || {},
            tutor: data.tutores && data.tutores[0] || { domicilio: {}, telefonos: [], correos: [] },
            nuevaContrasena: '' // Inicializamos el campo de contraseña
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

  // Función para actualizar la información del estudiante
  actualizar(): void {
    const alumnoId = localStorage.getItem('estudianteId'); // Verifica si el alumnoId está presente
    
    if (alumnoId) {
      // Si el usuario ha ingresado una nueva contraseña, la enviamos al backend
      const datosActualizados = { ...this.user };
      if (this.user.nuevaContrasena) {
        datosActualizados.contrasenia = this.user.nuevaContrasena; // Cambiar a 'contrasenia'
      }
      delete datosActualizados.nuevaContrasena;
  
      console.log('Datos enviados al backend:', datosActualizados); // Verificar qué se envía realmente
      
      // Usamos el servicio para actualizar el alumno por su ID
      this.alumnoService.actualizarAlumno(alumnoId, datosActualizados).subscribe(
        () => {
          alert('Perfil actualizado correctamente');
        },
        (error: any) => {
          console.error('Error al actualizar el perfil', error);
        }
      );
    } else {
      console.log('No se pudo obtener el ID del estudiante');
    }
  }
  

  // Función para cancelar la edición
  cancelar(): void {
    alert('Edición cancelada');
  }
}
