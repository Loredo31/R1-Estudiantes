import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  
  loginForm: FormGroup;
  hide = true;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Inicializar el formulario
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required]],
      contrasenia: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
  
    const { correo, contrasenia } = this.loginForm.value;
  
    this.authService.login(correo, contrasenia).subscribe({
      next: (response) => {
        console.log('Datos recibidos:', response); // Verifica que la respuesta tenga los datos esperados
  
        // Asegurarse de que la propiedad 'usuario' esté presente
        if (response.usuario && response.usuario.nombre) {
          console.log('Nombre de la empresa recibido:', response.usuario.nombre);
          localStorage.setItem('nombreEmpresa', response.usuario.nombre);
        } else {
          console.log('Nombre de la empresa no disponible en la respuesta');
          localStorage.setItem('nombreEmpresa', 'Nombre de la empresa no disponible');
        }
  
        // Guardar el ID del usuario (empresa o servicio escolar)
        localStorage.setItem('usuarioId', response.usuario.id);
  
        // Redirigir según el rol
        switch (response.usuario.rol) {
          case 1:
            this.router.navigate(['/empresas/home']);
            break;
          case 2:
            this.router.navigate(['/servicios-escolares/home']);
            break;
          default:
            this.router.navigate(['/404']);
            break;
        }
      },
      error: (err) => {
        this.errorMessage = 'Correo o contraseña incorrectos.';
      }
    });
  }
  
}