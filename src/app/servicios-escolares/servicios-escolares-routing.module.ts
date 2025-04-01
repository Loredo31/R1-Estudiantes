import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { BuscarEstComponent } from './pages/buscar-est/buscar-est.component';
import { HomeComponent } from './pages/home/home.component';
import { EstudiantePageComponent } from './pages/estudiante-page/estudiante-page.component';
import { BajaEstComponent } from './pages/baja-est/baja-est.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      //{path: 'nuevo-estudiante', component: RegistroEstComponent},
      {path: 'baja-estudiantes', component: BajaEstComponent},
      {path: 'buscar-estudiante', component: BuscarEstComponent},
      {path: 'home', component: HomeComponent},
      {path: 'edit/:id', component: EstudiantePageComponent},
      {path: ':id', component: EstudiantePageComponent},
      {path: '**', redirectTo: 'home'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiciosEscolaresRoutingModule { }
