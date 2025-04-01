import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlumnoService } from '../../../services/alumno.service';

@Component({
  selector: 'app-baja-est',
  templateUrl: './baja-est.component.html',
  styleUrls: ['./baja-est.component.css']
})

export class BajaEstComponent implements OnInit{
  searchTerm: string = '';
  students: any[] = [];
  filteredStudents: any[] = [];

  // Variables para el modal
  showModal: boolean = false;
  modalMessage: string = '';
  studentToDelete: any = null;

  constructor(private router: Router, private alumnoService: AlumnoService) {}

  ngOnInit(): void {
    this.cargarEstudiantes();
  }

  // Obtener estudiantes con rol 2 desde la base de datos
  cargarEstudiantes(): void {
    this.alumnoService.obtenerAlumnosBaja().subscribe(
      (data: any[]) => { // 🔹 Tipado explícito
        this.students = data;
        this.filteredStudents = this.filterStudentsByRol(data, 2); // Filtramos solo los de rol 2
      },
      (error: any) => {
        console.error('Error al obtener estudiantes dados de baja:', error);
      }
    );
  }

   // Filtrar estudiantes por rol
   filterStudentsByRol(students: any[], rol: number): any[] {
    return students.filter(student => student.rol === rol);
  }

  // Función de búsqueda
  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      // Si no hay búsqueda, mostramos todos los estudiantes con rol 2
      this.filteredStudents = this.filterStudentsByRol(this.students, 2);
      return;
    }

    const term = this.searchTerm.toLowerCase(); // Convertimos a minúsculas para búsqueda insensible a mayúsculas
  
    // Filtrar los estudiantes con rol 2 y que coincidan con el término de búsqueda
    this.filteredStudents = this.students.filter(student =>
      (student.matricula.includes(term) ||
      `${student.nombre} ${student.apellido_paterno} ${student.apellido_materno}`
        .toLowerCase()
        .includes(term)) && student.rol === 2
    );
  
    console.log('Resultados de búsqueda:', this.filteredStudents); // Verifica en la consola los resultados
  }

    // Restaurar estudiante (cambiar rol de 2 a 1)
    onRestore(student: any): void {
      // Restaurar rol de 2 a 1
      student.rol = 1;  // Cambiar el rol a 1 (activo)
      this.alumnoService.actualizarAlumno(student._id, student).subscribe(
        () => {
          alert(`${student.nombre} ha sido restaurado.`);
          this.cargarEstudiantes();  // Refrescar la lista después de restaurar
        },
        (error) => {
          console.error('Error al restaurar el estudiante:', error);
          alert('Hubo un error al restaurar el estudiante.');
        }
      );
    }

    onDelete(student: any): void {
      this.studentToDelete = student;
      this.modalMessage = `¿Estás seguro de que deseas dar de baja a ${student.nombre} ${student.apellido_paterno}?`;
      this.showModal = true;
    }
  
    // Cerrar el modal
    closeModal(): void {
      this.showModal = false;
    }
  
 // Confirmar la baja definitiva (eliminar completamente)
 onConfirmDelete(): void {
  if (this.studentToDelete) {
    // Baja definitiva (eliminar estudiante)
    this.alumnoService.eliminarAlumno(this.studentToDelete._id).subscribe(
      () => {
        alert(`${this.studentToDelete.nombre} ha sido eliminado definitivamente.`);
        this.cargarEstudiantes(); // Refrescar lista después de eliminar
      },
      (error) => {
        console.error('Error al eliminar al estudiante:', error);
        alert('Hubo un error al eliminar al estudiante.');
      }
    );
  }
  this.closeModal();
}
}
