import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudiantesRoutingModule } from './estudiantes-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ConsultasComponent } from './pages/consultas/consultas.component';
import { ActualizarComponent } from './pages/actualizar/actualizar.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Importa FormsModule



@NgModule({
  declarations: [
    HomeComponent,
    PerfilComponent,
    ConsultasComponent,
    ActualizarComponent,
    LayoutPageComponent
  ],
  imports: [
    CommonModule,
    EstudiantesRoutingModule,
    MaterialModule,
    RouterModule,
    FormsModule,  // Asegúrate de incluir FormsModule aqu

  ]
})
export class EstudiantesModule { }
