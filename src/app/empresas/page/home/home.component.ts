import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../../../services/solicitud.service'; // Importa el servicio de solicitudes

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  solicitudes: any[] = []; // Array para almacenar las solicitudes
  searchTerm: string = ''; // Término de búsqueda
  isModalOpen: boolean = false;  
  isEditModal: boolean = false;

  // Modelo para una solicitud
  solicitudModel = {
    numeroFolio: '',      // Folio único de la solicitud
    nombreEmpresa: '',    // Nombre de la empresa
    estatus: 'Pendiente', // Estatus de la solicitud
    carrera: '',          // Carrera solicitante
    puesto: '',           // Puesto solicitado
    experiencia: '',      // Experiencia
    conocimientos: '',    // Conocimientos
    cantidad: 0,          // Cantidad solicitada
    fechaSolicitud: new Date(), // Fecha de la solicitud
    fechaInicio: new Date(), // Fecha de inicio
    fechaFin: new Date(), // Fecha de fin
    apoyoEconomico: 0,    // Apoyo económico
    aprendizaje: '',      // Aprendizaje
    modalidad: '', // Modalidad de trabajo
    descripcionTrabajo: '' // Descripción del trabajo
  };



  constructor(private solicitudService: SolicitudService) {}

  ngOnInit(): void {
    this.getSolicitudes(); // Cargar las solicitudes al inicio
  }

  // Función para obtener todas las solicitudes
  getSolicitudes() {
    this.solicitudService.obtenerSolicitudes().subscribe(
      (data) => {
        this.solicitudes = data;  // Asigna los datos obtenidos al array de solicitudes
      },
      (error) => {
        console.error('Error al obtener solicitudes:', error); // Manejo de errores
      }
    );
  }

  // Función para abrir el modal de registro
  openRegisterModal() {
    this.solicitudModel = {
      numeroFolio: '',
      nombreEmpresa: '',
      estatus: 'Pendiente',
      carrera: '',
      puesto: '',
      experiencia: '',
      conocimientos: '',
      cantidad: 0,
      fechaSolicitud: new Date(),
      fechaInicio: new Date(),
      fechaFin: new Date(),
      apoyoEconomico: 0,
      aprendizaje: '',
      modalidad: '',
      descripcionTrabajo: ''
    };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;  
    this.isEditModal = false;
  }

  // Función para registrar una nueva solicitud
  registerSolicitud() {
    this.solicitudService.registrarSolicitud(this.solicitudModel).subscribe(
      (response) => {
        console.log('Solicitud registrada:', response); // Log de éxito
        this.getSolicitudes();  // Vuelve a cargar las solicitudes
      },
      (error) => {
        console.error('Error al registrar solicitud:', error); // Manejo de errores
      }
    );
  }

  // Función para abrir el modal de edición y cargar la solicitud a editar
  openEditModal(solicitud: any) {
    this.solicitudModel = { ...solicitud };
    // Establecemos la variable isModalOpen en true para mostrar el modal
    this.isModalOpen = true;
  }

  // Función para editar una solicitud
  editSolicitud() {
    this.solicitudService.editarSolicitud(this.solicitudModel.numeroFolio, this.solicitudModel).subscribe(
      (response) => {
        console.log('Solicitud editada:', response); // Log de éxito
        this.getSolicitudes();  // Vuelve a cargar las solicitudes
        this.closeModal();  // Cerrar el modal
      },
      (error) => {
        console.error('Error al editar solicitud:', error); // Manejo de errores
      }
    );
  }

  // Función para eliminar una solicitud
  deleteSolicitud(id: string) {
    this.solicitudService.eliminarSolicitud(id).subscribe(
      (response) => {
        console.log('Solicitud eliminada:', response); // Log de éxito
        this.getSolicitudes();  // Vuelve a cargar las solicitudes
      },
      (error) => {
        console.error('Error al eliminar solicitud:', error); // Manejo de errores
      }
    );
  }
}
