import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {
  public sidebarItems = [
    {label:'Home',icon:'home',url:'./home'},
    {label:'Estudiantes',icon:'account_circle',url:'./estudiantes'},
    {label:'Observaciones',icon:'feedback',url:'./observaciones'},
    {label:'Cerrar sesión', icon:'exit_to_app', url:'', action: () => this.logout()}
  ];

  constructor(private AuthService: AuthService) {}

  logout():void{
    this.AuthService.logout
  }
}

