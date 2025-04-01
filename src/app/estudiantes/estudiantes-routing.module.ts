import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ConsultasComponent } from './pages/consultas/consultas.component';
import { ActualizarComponent } from './pages/actualizar/actualizar.component';
import { HomeComponent } from './pages/home/home.component'; // Importa HomeComponent

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent, // LayoutPage es el contenedor principal
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },  // Redirige a Home por defecto
      { path: 'home', component: HomeComponent },  // Ruta de inicio (Home)
      { path: 'perfil', component: PerfilComponent },  // Ruta para Perfil
      { path: 'consultas', component: ConsultasComponent },
      { path: 'actualizar', component: ActualizarComponent },
      { path: '**', redirectTo: 'home' }  // Redirige a Home si la ruta no existe
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudiantesRoutingModule { }
