import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {
  public sidebarItems = [
    {label:'Home',icon:'home',url:'./home'},
    {label:'Perfil',icon:'account_circle',url:'./perfil'},
    {label:'Actualizar',icon:'autorenew',url:'./actualizar'},
    {label:'Consultar',icon:'search',url:'./consultas'},
    {label:'Cerrar sesión', icon:'exit_to_app', url:'', action: () => this.logout()}
  ];

  constructor(private authService: AuthService) {}

  logout():void{
    this.authService.logout
  }
}