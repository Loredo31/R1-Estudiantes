import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfesorClaseRoutingModule } from './profesor-clase-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { ObservacionesComponent } from './pages/observaciones/observaciones.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';




// Importa los módulos necesarios de Angular Material

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importarlos
import { MaterialModule } from '../material/material.module';
import { ObservacionDialogComponent } from './pages/observaciones/observacion-dialog/observacion-dialog.component';


@NgModule({
  declarations: [
    HomeComponent,
    StudentListComponent,
    ObservacionesComponent,
    LayoutPageComponent,
    ObservacionDialogComponent
  ],
  imports: [
    CommonModule,
    ProfesorClaseRoutingModule,
    FormsModule,           // Asegúrate de importar FormsModule
    ReactiveFormsModule,
    MaterialModule    
  ]
})
export class ProfesorClaseModule { }
