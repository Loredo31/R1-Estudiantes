import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: '**', redirectTo: 'home'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiciosEscolaresRoutingModule { }
