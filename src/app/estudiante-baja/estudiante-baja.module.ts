import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstudianteBajaRoutingModule } from './estudiante-baja-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { HomeComponent } from './pages/home/home.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    LayoutPageComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    EstudianteBajaRoutingModule,
    MaterialModule
  ]
})
export class EstudianteBajaModule { }
