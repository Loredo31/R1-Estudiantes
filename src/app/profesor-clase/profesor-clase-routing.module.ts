import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { HomeComponent } from './pages/home/home.component'; // Página de inicio
import { StudentListComponent } from './pages/student-list/student-list.component'; // Lista de estudiantes
import { ObservacionesComponent } from './pages/observaciones/observaciones.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,  // LayoutPage es el contenedor principal
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },  // Redirige a Home por defecto
      { path: 'home', component: HomeComponent },  // Ruta de inicio (Home)
      { path: 'estudiantes', component: StudentListComponent },  // Ruta para la lista de estudiantes
      {path: 'observaciones',component: ObservacionesComponent},
      { path: '**', redirectTo: 'home' }  // Redirige a Home si la ruta no existe
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfesorClaseRoutingModule { }
