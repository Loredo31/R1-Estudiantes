import { Component, OnInit } from '@angular/core';
import { ProfesorExtService } from '../../../services/profesorExt.service';  // Asegúrate de que el servicio esté bien importado

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {
  alumnos: any[] = [];
  filteredStudents: any[] = [];  // Lista para almacenar los estudiantes filtrados
  searchQuery: string = '';  // Variable para almacenar el término de búsqueda
  nuevaActividad = { nombre: '', descripcion: '', fecha_inicio: '', fecha_fin: '' };  // Datos de la nueva actividad
  mostrarModal: boolean = false;  // Variable para mostrar u ocultar el modal
  selectedStudent: any = null;  // Aquí almacenamos el estudiante seleccionado
  selectedAlumnoId: string = '';  // El ID del alumno seleccionado
  nombre_actividad: string | null = null;  // El nombre de la actividad
  fecha_inicio_actividad: Date | null = null;  // La fecha de inicio de la actividad
  fecha_fin_actividad: Date | null = null;  // La fecha de fin de la actividad
  actividadesDisponibles: any[] = [  // Lista de actividades disponibles (esto puede venir del backend)
    { nombre: 'Fútbol' },
    { nombre: 'Básquetbol' },
    { nombre: 'Teatro' },
    { nombre: 'Música' },
    { nombre: 'Voleibol' },
    { nombre: 'Ajedrez' },
    { nombre: 'Danza' },
    { nombre: 'Zumba' }
  ];

  constructor(private profesorExtService: ProfesorExtService) { }

  ngOnInit(): void {
    this.obtenerAlumnos();  // Llamar a la función para obtener todos los alumnos
  }

  // Obtener alumnos con rol 1
  obtenerAlumnos(): void {
    this.profesorExtService.obtenerAlumnos().subscribe(
      (alumnos) => {
        // Filtramos solo los alumnos con rol 1
        this.alumnos = alumnos.filter(alumno => alumno.rol === 1);
        this.filteredStudents = [...this.alumnos];  // Inicializamos filteredStudents con todos los alumnos con rol 1
      },
      (error) => {
        console.error('Error al obtener los alumnos:', error);
      }
    );
  }

  // Buscar alumnos por nombre o matrícula
  buscarAlumnos(): void {
    if (this.searchQuery.trim()) {
      this.filteredStudents = this.alumnos.filter((alumno) => {
        return (
          alumno.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          alumno.matricula.includes(this.searchQuery) || 
          alumno.apellido_paterno.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          alumno.apellido_materno.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    } else {
      this.filteredStudents = [...this.alumnos];  // Si no hay búsqueda, mostrar todos los alumnos
    }
  }

  // Abrir el modal para agregar actividad
  abrirModalAgregarActividad(student: any): void {
    this.selectedStudent = student;  // Asignar el estudiante seleccionado
    this.selectedAlumnoId = student._id;  // Asignar el ID del alumno seleccionado
    this.mostrarModal = true;  // Mostramos el modal
  }

  // Cerrar el modal
  cerrarModal(): void {
    this.mostrarModal = false;  // Ocultamos el modal
  }

  // Método para actualizar la actividad de un alumno
  actualizarActividad(): void {
    // Dentro del método actualizarActividad() en el componente
console.log('Datos enviados al backend:', {
  alumnoId: this.selectedAlumnoId,
  nombre_actividad: this.nombre_actividad,
  fecha_inicio_actividad: this.fecha_inicio_actividad,
  fecha_fin_actividad: this.fecha_fin_actividad
});

    if (!this.selectedAlumnoId) {
      console.error('No se ha seleccionado un alumno');
      return;
    }

    // Llamar al servicio para actualizar la actividad
    this.profesorExtService.actualizarActividad(
      this.selectedAlumnoId,
      this.nombre_actividad,
      this.fecha_inicio_actividad,
      this.fecha_fin_actividad
    ).subscribe(
      (response) => {
        console.log('Actividad actualizada con éxito:', response);
        alert("Actividad registrada con éxito!!!")
        this.cerrarModal();
      },
      (error) => {
        console.error('Error al actualizar la actividad:', error);
      }
    );
  }
}
