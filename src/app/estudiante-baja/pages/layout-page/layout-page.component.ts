

import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  //styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {

  public sidebarItems = [
    {label:'Pantalla de inicio',icon:'home',url:'./home'},
       {label:'Cerrar sesión', icon:'exit_to_app', url:'', action: () => this.logout()}
     ];
   
     constructor(private AuthService: AuthService) {}
   
     logout():void{
       this.AuthService.logout
     }
}