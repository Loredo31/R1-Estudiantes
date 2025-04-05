import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ServiciosEscolaresRoutingModule } from './servicios-escolares-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from './pages/home/home.component';
import { DetallesSolicitudComponent } from './pages/detalles-solicitud/detalles-solicitud.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    LoginPageComponent,
    HomeComponent,
    DetallesSolicitudComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ServiciosEscolaresRoutingModule,
    MaterialModule,
  ]
})
export class ServiciosEscolaresModule { }
