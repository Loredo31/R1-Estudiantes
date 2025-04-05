import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  //styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {

  public sidebarItems = [
    {label:'Solicitud-Practicas',icon:'list',url:'./home'},
    {label:'Cerrar sesión', icon:'exit_to_app', url:'', action: () => this.logout()}
  ];

  constructor(private authService: AuthService) {}

  logout():void{
    this.authService.logout
  }
}