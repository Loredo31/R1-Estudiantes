import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../../../services/solicitud.service';

@Component({
  selector: 'app-registrar-solicitud',
  templateUrl: './registrar-solicitud.component.html',
  styleUrls: ['./registrar-solicitud.component.css']
})
export class RegistrarSolicitudComponent implements OnInit {
  isModalOpen = false; // Controlador del modal
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

  constructor(private solicitudService: SolicitudService) {}

  ngOnInit(): void {
    this.solicitudModel.nombreEmpresa = localStorage.getItem('nombreEmpresa') || '';
  }

  // Método para abrir el modal
  openModal(): void {
    this.isModalOpen = true;
  }

  // Método para cerrar el modal
  closeModal(): void {
    this.isModalOpen = false;
  }

  // Método para registrar la solicitud
  registerSolicitud(): void {
    if (this.solicitudModel.nombreEmpresa && this.solicitudModel.carrera && this.solicitudModel.puesto) {
      this.solicitudService.registrarSolicitud(this.solicitudModel).subscribe({
        next: (response) => {
          console.log('Solicitud registrada exitosamente', response);
          this.closeModal(); // Cerrar modal después del registro
        },
        error: (err) => {
          console.error('Error al registrar la solicitud', err);
        }
      });
    } else {
      alert('Por favor complete todos los campos obligatorios.');
    }
  }
}
