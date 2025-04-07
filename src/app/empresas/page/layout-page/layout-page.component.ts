import { Component } from '@angular/core';
import { EmpresaService } from '../../../services/empresa.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
})
export class LayoutPageComponent {

  public sidebarItems = [
    { label: 'CRUD', icon: 'home', url: './home' },
    { label:"Registro",icon: 'save',url:'./registro'},
    { label: 'Cerrar sesión', icon: 'exit_to_app', url: '', action: () => this.logout() }
  ];

  constructor(private empresaService: EmpresaService) {}

  logout(): void {
    this.empresaService.logout(); 
  }
}
