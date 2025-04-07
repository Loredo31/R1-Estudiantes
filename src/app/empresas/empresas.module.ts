import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { EmpresasRoutingModule } from './empresas-routing.module';
import { LayoutPageComponent } from './page/layout-page/layout-page.component';
import { HomeComponent } from './page/home/home.component';
import { DetallesSolicitudComponent } from './page/detalles-solicitud/detalles-solicitud.component';
import { FormsModule } from '@angular/forms';
import { RegistrarSolicitudComponent } from './page/registrar-solicitud/registrar-solicitud.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    LayoutPageComponent,
    HomeComponent,
    DetallesSolicitudComponent,
    RegistrarSolicitudComponent
  ],
  imports: [
    CommonModule,
    EmpresasRoutingModule,
    MaterialModule,
    FormsModule,
    MatDialogModule
  ],
  
})
export class EmpresasModule { }
