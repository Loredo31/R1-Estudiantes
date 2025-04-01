import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../../../services/auth.service'; // Importamos AuthService

interface Student {
  id: string;
  name: string;
}

@Component({
  selector: 'app-observacion-dialog',
  templateUrl: './observacion-dialog.component.html',
  styleUrls: ['./observacion-dialog.component.css']
})
export class ObservacionDialogComponent implements OnInit {
  newObservation = {
    studentName: '',
    subject: '',
    semester: 1,
    year: new Date().getFullYear(),
    description: '',
    teacherId: '',  // ID del profesor
    teacherName: ''  // Nombre del profesor
  };

  students: Student[] = [];
  subjects: string[] = [];
  semesters: number[] = [];

  constructor(
    public dialogRef: MatDialogRef<ObservacionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService  // Inyectamos el servicio de autenticación
  ) {
    if (data) {
      this.students = data.students || [];
      this.subjects = data.subjects || [];
      this.semesters = data.semesters || [];
    }
  }

  ngOnInit() {
    this.loadTeacherData();  // Cargar el ID y nombre del profesor
  }

  loadTeacherData() {
    const token = this.authService.getToken();  // Obtener el token del AuthService
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));  // Decodificar el token JWT
      this.newObservation.teacherId = decodedToken.matricula;  // Asignamos el ID del profesor
      this.newObservation.teacherName = decodedToken.nombre;  // Asignamos el nombre del profesor (suponiendo que está en el token)
    } else {
      console.error('No se encontró el token');
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.newObservation);  // Enviamos la nueva observación con los valores seleccionados
  }
}
