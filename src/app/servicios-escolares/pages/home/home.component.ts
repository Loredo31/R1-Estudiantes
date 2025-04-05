import { Component, OnInit, OnDestroy } from '@angular/core';
import { SolicitudService } from '../../../services/solicitud.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DetallesSolicitudComponent } from '../detalles-solicitud/detalles-solicitud.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  solicitudes: any[] = [];
  solicitudesFiltradas: any[] = [];
  
  // Filtros
  filtroEmpresa = new FormControl('');
  filtroCarrera = new FormControl('');
  
  // Lista de carreras disponibles (se puede extraer de las solicitudes)
  carreras: string[] = [];
  
  constructor(
    private solicitudService: SolicitudService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.cargarSolicitudes();
    
    // Configurar escuchas para los filtros
    this.filtroEmpresa.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => this.aplicarFiltros());
      
    this.filtroCarrera.valueChanges
      .subscribe(() => this.aplicarFiltros());
  }
  
  cargarSolicitudes(): void {
    this.solicitudService.obtenerSolicitudes().subscribe(
      (data) => {
        this.solicitudes = data;
        this.solicitudesFiltradas = [...data];
        
        // Extraer carreras únicas para el filtro
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
    const empresaFiltro = this.filtroEmpresa.value?.toLowerCase() || '';
    const carreraFiltro = this.filtroCarrera.value || '';
    
    this.solicitudesFiltradas = this.solicitudes.filter(solicitud => {
      const cumpleEmpresa = !empresaFiltro || 
        solicitud.nombreEmpresa.toLowerCase().includes(empresaFiltro);
      const cumpleCarrera = !carreraFiltro || 
        solicitud.carrera === carreraFiltro;
        
      return cumpleEmpresa && cumpleCarrera;
    });
  }
  
  limpiarFiltros(): void {
    this.filtroEmpresa.setValue('');
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
}