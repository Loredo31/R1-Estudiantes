import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AlumnoService } from '../../../services/alumno.service';

@Component({
  selector: 'app-buscar-est',
  templateUrl: './buscar-est.component.html',
  styleUrls: ['./buscar-est.component.css'] // Verifica esta ruta
})

export class BuscarEstComponent implements OnInit{
  searchTerm: string = '';
  students: any[] = [];
  filteredStudents: any[] = [];

  // Variables para el modal
  showModal: boolean = false;
  modalMessage: string = '';
  studentToDelete: any = null;

  
  // Estudiante a editar
  studentToEdit: any = null;

  // Áreas y especialidades
  areas: string[] = ['Ingeniería en Sistemas', 'Ingeniería en Electrónica', 'Ingeniería Mecánica'];
  specialties: string[] = [];

  constructor(private router: Router, private alumnoService: AlumnoService) {}

  ngOnInit(): void {
    this.obtenerEstudiantes();
  }


  // Obtener todos los estudiantes desde la base de datos
  obtenerEstudiantes(): void {
    this.alumnoService.obtenerAlumnos().subscribe(
      (data: any[]) => {
        // Filtrar solo estudiantes con rol 1
        this.students = data.filter(student => student.rol === 1);
        this.filteredStudents = this.students;
      },
      (error: any) => {
        console.error('Error al obtener los estudiantes:', error);
      }
    );
  }

  
  // Función de búsqueda
  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      // Si no hay búsqueda, mostramos todos los estudiantes
      this.filteredStudents = this.students;
      return;
    }
  
    const term = this.searchTerm.toLowerCase(); // Convertimos a minúsculas para búsqueda insensible a mayúsculas
  
    this.filteredStudents = this.students.filter(student =>
      student.matricula.includes(term) ||
      `${student.nombre} ${student.apellido_paterno} ${student.apellido_materno}`
        .toLowerCase()
        .includes(term)
    );
  
    console.log('Resultados de búsqueda:', this.filteredStudents); // Verifica en la consola los resultados
  }

  // Iniciar edición
  onEdit(student: any): void {
    // Clonamos el objeto para evitar modificar los datos originales
    this.studentToEdit = { ...student };
    this.studentToEdit.isEditing = true;  // Activar el estado de edición
  }

  // Métodos para agregar y eliminar teléfonos y correos
  addPhone(student: any): void {
    student.telefonos.push('');
  }

  removePhone(student: any, index: number): void {
    student.telefonos.splice(index, 1);
  }

  addEmail(student: any): void {
    student.correos.push('');
  }

  removeEmail(student: any, index: number): void {
    student.correos.splice(index, 1);
  }

  addTutorPhone(student: any): void {
    student.tutores[0].telefonos.push('');
  }

  removeTutorPhone(student: any, index: number): void {
    student.tutores[0].telefonos.splice(index, 1);
  }

  addTutorEmail(student: any): void {
    student.tutores[0].correos.push('');
  }

  removeTutorEmail(student: any, index: number): void {
    student.tutores[0].correos.splice(index, 1);
  }

  // Función de cambio de carrera (en caso de que sea necesario)
  onCareerChange(event: any): void {
    const selectedArea = event.target.value;
    // Dependiendo del área seleccionada, actualizamos las especialidades
    if (selectedArea === 'Ingeniería en Sistemas') {
      this.specialties = ['Redes', 'Desarrollo de Software'];
    } else if (selectedArea === 'Ingeniería en Electrónica') {
      this.specialties = ['Automatización', 'Electrónica Industrial'];
    } else if (selectedArea === 'Ingeniería Mecánica') {
      this.specialties = ['Diseño Mecánico', 'Fabricación'];
    }
  }

  // Cancelar edición
  onCancelEdit(student: any): void {
    student.isEditing = false;  // Cancelar la edición
    // Restaurar los datos originales si es necesario
    const originalStudent = this.students.find(s => s._id === student._id);
    if (originalStudent) {
      Object.assign(student, originalStudent);
    }
    this.studentToEdit = null;  // Cerrar el modal
  }

  // Guardar los cambios
  onSave(student: any): void {
    this.alumnoService.actualizarAlumno(student._id, student).subscribe(
      () => {
        alert('Estudiante actualizado correctamente.');
        student.isEditing = false;  // Desactivar el modo de edición
        this.obtenerEstudiantes();  // Refrescar la lista con los datos actualizados
        this.studentToEdit = null;  // Cerrar el modal
      },
      (error) => {
        console.error('Error al actualizar el estudiante:', error);
      }
    );
  }


  // Mostrar el modal de confirmación para dar de baja
  onDelete(student: any): void {
    this.studentToDelete = student;
    this.modalMessage = `¿Estás seguro de que deseas dar de baja a ${student.nombre} ${student.apellido_paterno}?`;
    this.showModal = true;
  }

  // Cerrar el modal
  closeModal(): void {
    this.showModal = false;
  }

// Confirmar la acción de baja (temporal o definitiva)
onConfirmDelete(action: string): void {
  if (this.studentToDelete) {
    if (action === 'temp') {
      // Baja temporal (cambiar rol a 2)
      this.studentToDelete.rol = 2;
      this.alumnoService.actualizarAlumno(this.studentToDelete._id, this.studentToDelete).subscribe(
        () => {
          alert(`${this.studentToDelete.nombre} ha sido dado de baja temporalmente.`);
          this.obtenerEstudiantes(); // Refrescar lista
        },
        (error) => console.error('Error al dar de baja temporalmente:', error)
      );
    } else if (action === 'permanent') {
      // Baja definitiva (eliminar estudiante)
      this.alumnoService.eliminarAlumno(this.studentToDelete._id).subscribe(
        () => {
          alert(`${this.studentToDelete.nombre} ha sido eliminado definitivamente.`);
          this.obtenerEstudiantes(); // Refrescar lista
        },
        (error) => console.error('Error al eliminar al estudiante:', error)
      );
    }
  }
  this.closeModal();
}


}
