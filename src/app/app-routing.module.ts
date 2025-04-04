import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { LoginPageComponent } from './servicios-escolares/pages/login-page/login-page.component';

const routes: Routes = [
  {path: '',
    component:LoginPageComponent
  },
  {
    path: 'servicios-escolares',
    loadChildren: () => import('./servicios-escolares/servicios-escolares.module').then( m => m.ServiciosEscolaresModule),
  },
  {path: 'empresas',
    loadChildren: () => import('./empresas/empresas.module').then( m => m.EmpresasModule),   
  },
  {
    path: '404',
    component: Error404PageComponent,
  },
  {
    path: ' ',
    redirectTo: 'servicios-escolares',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }