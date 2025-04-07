import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './page/layout-page/layout-page.component';
import { HomeComponent } from './page/home/home.component';
import { RegistrarSolicitudComponent } from './page/registrar-solicitud/registrar-solicitud.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'registro',component: RegistrarSolicitudComponent},
      { path: '**', redirectTo: 'home' }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresasRoutingModule { }
