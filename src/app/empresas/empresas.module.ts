import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { EmpresasRoutingModule } from './empresas-routing.module';
import { LayoutPageComponent } from './page/layout-page/layout-page.component';
import { HomeComponent } from './page/home/home.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    EmpresasRoutingModule,
    MaterialModule
  ]
})
export class EmpresasModule { }
