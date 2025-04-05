// detalles-solicitud.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SolicitudService } from '../../../services/solicitud.service';

@Component({
  selector: 'app-detalles-solicitud',
  templateUrl: './detalles-solicitud.component.html',
  styleUrls: ['./detalles-solicitud.component.scss']
})
export class DetallesSolicitudComponent implements OnInit {
  cargando = false;
  
  constructor(
    private solicitudService: SolicitudService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DetallesSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {solicitud: any}
  ) { }

  ngOnInit(): void {
  }
  
  formatearFecha(fecha: string): string {
    if (!fecha) return 'No disponible';
    return new Date(fecha).toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }
  
  actualizarEstatus(nuevoEstatus: string): void {
    this.cargando = true;
    
    const solicitudActualizada = {
      ...this.data.solicitud,
      estatus: nuevoEstatus
    };
    
    this.solicitudService.editarSolicitud(this.data.solicitud._id, solicitudActualizada)
      .subscribe(
        (resultado) => {
          this.snackBar.open(
            `Solicitud ${nuevoEstatus.toLowerCase()} correctamente`, 
            'Cerrar', 
            { duration: 3000, panelClass: nuevoEstatus === 'Aprobada' ? 'snackbar-success' : 'snackbar-error' }
          );
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Error al actualizar la solicitud:', error);
          this.snackBar.open(
            'Error al actualizar el estatus de la solicitud', 
            'Cerrar', 
            { duration: 3000, panelClass: 'snackbar-error' }
          );
          this.cargando = false;
        }
      );
  }
  
  cerrar(): void {
    this.dialogRef.close();
  }
}