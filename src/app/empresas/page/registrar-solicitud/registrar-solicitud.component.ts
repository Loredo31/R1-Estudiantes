import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../../../services/solicitud.service';
import { CatalogosService } from '../../../services/catalogo.service';

@Component({
  selector: 'app-registrar-solicitud',
  templateUrl: './registrar-solicitud.component.html',
  styleUrls: ['./registrar-solicitud.component.css']
})
export class RegistrarSolicitudComponent implements OnInit {
  solicitudModel: any = {
    nombreEmpresa: '',
    estatus: 'Pendiente',
    carrera: '',
    puesto: '',
    experiencia: '',
    conocimientos: '',
    cantidad: 0,
    fechaInicio: '',
    fechaFin: '',
    apoyoEconomico: 0,
    aprendizaje: '',
    modalidad: '',
    descripcionTrabajo: ''
  };

  
  carreras: any[] = [];
  puestos: any[] = [];

  constructor(private solicitudService: SolicitudService,private catalogosService: CatalogosService) {}

  ngOnInit(): void {
    this.solicitudModel.nombreEmpresa = localStorage.getItem('nombreEmpresa') || '';
    this.catalogosService.getCarreras().subscribe(data => {
      this.carreras = data;
    });

    this.catalogosService.getPuestos().subscribe(data => {
      this.puestos = data;
    });
  }

  // Método para registrar la solicitud
  registerSolicitud(): void {
    if (this.solicitudModel.nombreEmpresa && this.solicitudModel.carrera && this.solicitudModel.puesto) {
      this.solicitudService.registrarSolicitud(this.solicitudModel).subscribe({
        next: (response) => {
          console.log('Solicitud registrada exitosamente', response);
          alert('Solicitud de la empresa '+response.nombreEmpresa+' registrada exitosamente con Folio: ' + response.numeroFolio);
          // Opcional: limpiar el formulario
          this.resetForm();
        },
        error: (err) => {
          console.error('Error al registrar la solicitud', err);
          alert('Ocurrió un error al registrar la solicitud.');
        }
      });
    } else {
      alert('Por favor complete todos los campos obligatorios.');
    }
  }

  // Método opcional para limpiar el formulario después del registro
  resetForm(): void {
    this.solicitudModel = {
      nombreEmpresa: localStorage.getItem('nombreEmpresa') || '',
      estatus: 'Pendiente',
      carrera: '',
      puesto: '',
      experiencia: '',
      conocimientos: '',
      cantidad: 0,
      fechaInicio: '',
      fechaFin: '',
      apoyoEconomico: 0,
      aprendizaje: '',
      modalidad: '',
      descripcionTrabajo: ''
    };
  }
}
