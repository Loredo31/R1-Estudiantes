import { Component, OnInit, ViewChild } from '@angular/core';
import { SolicitudService } from '../../../services/solicitud.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DetallesSolicitudComponent } from '../detalles-solicitud/detalles-solicitud.component';
import { RegistrarSolicitudComponent } from '../registrar-solicitud/registrar-solicitud.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  solicitudes: any[] = [];
  solicitudesFiltradas: any[] = [];
  
  // Filtros
  filtroFolio = new FormControl('');
  filtroCarrera = new FormControl('');
  
  // Lista de carreras disponibles (se puede extraer de las solicitudes)
  carreras: string[] = [];
  nombreEmpresa: string = '';
  isModalOpen = false;


  
  constructor(
    private solicitudService: SolicitudService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.cargarSolicitudes();
  
    // Verificar si el nombre de la empresa está en localStorage después de la carga
    setTimeout(() => {
      this.nombreEmpresa = localStorage.getItem('nombreEmpresa') || 'Nombre de la empresa no encontrado';
      console.log('Nombre de empresa desde localStorage:', this.nombreEmpresa);
    }, 100);  // Retraso para esperar que los datos se hayan almacenado
  }
  
  @ViewChild(RegistrarSolicitudComponent) registrarSolicitudComponent!: RegistrarSolicitudComponent;

  abrirModalSolicitud(): void {
    this.registrarSolicitudComponent.openModal();
    this.isModalOpen = true;
  }

  openModal(): void {
    const dialogRef = this.dialog.open(RegistrarSolicitudComponent, {
      width: '600px',  // Define el tamaño del modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarSolicitudes();  // Actualiza las solicitudes si es necesario
      }
    });
  }

  cargarSolicitudes(): void {
    this.solicitudService.obtenerSolicitudesPorNombreEmpresa().subscribe(
      (data) => {
        this.solicitudes = data;
        this.solicitudesFiltradas = [...this.solicitudes];
        
        // Extraer carreras únicas
        this.extraerCarreras();
      },
      (error) => {
        console.error('Error al cargar solicitudes:', error);
      }
    );
  }
  
  extraerCarreras(): void {
    // Extraer carreras únicas
    const carreras = new Set<string>();
    this.solicitudes.forEach(solicitud => {
      if (solicitud.carrera) {
        carreras.add(solicitud.carrera);
      }
    });
    this.carreras = Array.from(carreras).sort();
  }
  
  aplicarFiltros(): void {
    const folioFiltro = this.filtroFolio.value?.toLowerCase() || '';
    const carreraFiltro = this.filtroCarrera.value || '';
    
    this.solicitudesFiltradas = this.solicitudes.filter(solicitud => {
      const cumpleFolio = !folioFiltro || solicitud.numeroFolio.toString().toLowerCase().includes(folioFiltro);
      const cumpleCarrera = !carreraFiltro || solicitud.carrera === carreraFiltro;
        
      return cumpleFolio && cumpleCarrera;
    });
  }
  
  limpiarFiltros(): void {
    this.filtroFolio.setValue('');
    this.filtroCarrera.setValue('');
    this.solicitudesFiltradas = [...this.solicitudes];
  }
  
  abrirDetalles(solicitud: any): void {
    const dialogRef = this.dialog.open(DetallesSolicitudComponent, {
      width: '600px',
      data: { solicitud: { ...solicitud } }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Actualizar la lista después de un cambio
        this.cargarSolicitudes();
      }
    });
  }
  
  getEstatusClass(estatus: string): string {
    switch (estatus) {
      case 'Aprobada': return 'estatus-aprobada';
      case 'Rechazada': return 'estatus-rechazada';
      default: return 'estatus-pendiente';
    }
  }

  cerrarModalSolicitud(): void {
    this.isModalOpen = false;
  }
}