import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AlumnoService } from '../../../services/alumno.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

interface Student {
  name: string;
  career: string;
  id: string;
  photo?: string;
}

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  searchQuery: string = '';
  displayedColumns: string[] = ['photo', 'name', 'career', 'id', 'actions'];
  dataSource = new MatTableDataSource<Student>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private alumnoService: AlumnoService) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.alumnoService.obtenerAlumnos().subscribe(
      (data: any[]) => {
        // Filtrar los estudiantes con rol 1
        const students = data
          .filter((student: any) => student.rol === 1)  // Solo rol 1
          .map((student: any) => ({
            name: `${student.nombre} ${student.apellido_paterno} ${student.apellido_materno}`,
            career: student.carrera ? student.carrera.nombre : 'No definida',
            id: student.matricula,
            photo: student.foto || ''
          }));

        this.dataSource.data = students;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        console.error('Error al obtener estudiantes:', error);
      }
    );
  }

  searchStudent() {
    this.dataSource.filter = this.searchQuery.trim().toLowerCase();
  }

  viewStudentDetails(student: Student) {
    console.log('Ver detalles del estudiante:', student);
  }

  editStudent(student: Student) {
    console.log('Editar estudiante:', student);
  }

  deleteStudent(student: Student) {
    this.dataSource.data = this.dataSource.data.filter(s => s.id !== student.id);
    console.log('Eliminar estudiante:', student);
  }
}
