import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfesorExtRoutingModule } from './profesor-ext-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { EstudiantesComponent } from './pages/estudiantes/estudiantes.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    EstudiantesComponent,
    LayoutPageComponent
  ],
  imports: [
    CommonModule,
    ProfesorExtRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class ProfesorExtModule { }
