import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';  // Importamos MatSnackBar
import { ObservacionDialogComponent } from './observacion-dialog/observacion-dialog.component';
import { ObservacionService } from '../../../services/observacion.service';
import { AlumnoService } from '../../../services/alumno.service';
import { AuthService } from '../../../services/auth.service';  // Importamos el servicio de autenticación

interface Observation {
  teacherId: string;
  teacherName: string;
  studentName: string;
  subject: string;
  semester: number;
  year: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-observaciones',
  templateUrl: './observaciones.component.html',
  styleUrls: ['./observaciones.component.css']
})
export class ObservacionesComponent implements OnInit {
  observations: Observation[] = [];
  filteredObservations: Observation[] = [];
  teacherId: string = ''; // Este ID será dinámico, basado en el login
  students: { id: string, name: string }[] = []; // Lista de estudiantes
  semesters: number[] = [1, 2, 3, 4, 5, 6]; // Semestres (1-6)
  subjects: string[] = ['Programación', 'Redes', 'Calidad de Producción', 'Electromagnetismo', 'Química Aplicada', 'Base de Datos']; // Asignaturas

  constructor(
    private observacionService: ObservacionService,
    private alumnoService: AlumnoService,
    private authService: AuthService,  // Inyectamos el servicio de autenticación
    public dialog: MatDialog,
    private snackBar: MatSnackBar  // Inyectamos MatSnackBar para mostrar notificaciones
  ) {}

  ngOnInit() {
    this.loadTeacherId();  // Obtener el ID del profesor basado en el rol 3
    this.loadObservations();
    this.loadStudents(); // Cargar los estudiantes al inicio
  }

  loadTeacherId() {
    const token = this.authService.getToken(); // Obtener el token
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));  // Decodificar el token JWT
        console.log('Token decodificado:', decodedToken);  // Imprimir el token decodificado
        
        // Verificamos si el rol es 3 (profesor)
        if (decodedToken.rol === 3) {
          this.teacherId = decodedToken.id;  // Usamos el ID del token como ID del profesor
          console.log('Teacher ID establecido:', this.teacherId);  // Verificar que el ID se haya asignado correctamente
        } else {
          console.error('El usuario no tiene rol de profesor');
        }
      } catch (error) {
        console.error('Error al decodificar el token', error);
      }
    } else {
      console.error('No se encontró el token');
    }
  }
  
  loadObservations() {
    console.log('Teacher ID en loadObservations:', this.teacherId);  // Verificar el valor del teacherId
    if (!this.teacherId) {
      console.error('Teacher ID no encontrado');
      alert('No se pudo cargar las observaciones, asegúrate de estar logueado como profesor.');
      return;
    }

    this.observacionService.obtenerObservacionesPorProfesor(this.teacherId).subscribe(
      (data: Observation[]) => {
        this.observations = data;
        this.filteredObservations = [...this.observations];
      },
      (error) => {
        console.error('Error al cargar observaciones:', error);
        this.snackBar.open('Error al cargar las observaciones', 'Cerrar', { duration: 3000 });
      }
    );
  }

  loadStudents() {
    this.alumnoService.obtenerAlumnos().subscribe(
      (data: any[]) => {
        this.students = data.map(student => ({
          id: student.matricula,
          name: `${student.nombre || ''} ${student.apellido_paterno || ''} ${student.apellido_materno || ''}`
        }));
      },
      (error) => {
        console.error('Error al cargar estudiantes:', error);
        this.snackBar.open('Error al cargar los estudiantes', 'Cerrar', { duration: 3000 });
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ObservacionDialogComponent, {
      width: '600px',
      data: {
        semesters: this.semesters,
        subjects: this.subjects,
        students: this.students // Pasar la lista de estudiantes al diálogo
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.guardarObservacion(result);
      }
    });
  }

  guardarObservacion(newObservation: Observation) {
    newObservation.teacherId = this.teacherId;  // Asignamos el ID del profesor de la sesión

    this.observacionService.agregarObservacion(newObservation).subscribe(
      (response) => {
        this.snackBar.open('Observación guardada exitosamente', 'Cerrar', { duration: 3000 });
        this.loadObservations(); // Recargar las observaciones
      },
      (error) => {
        this.snackBar.open('Error al guardar observación', 'Cerrar', { duration: 3000 });
        console.error('Error al guardar observación:', error);
      }
    );
  }
}
