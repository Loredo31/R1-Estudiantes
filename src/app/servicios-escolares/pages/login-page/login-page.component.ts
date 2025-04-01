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
      matricula: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { matricula, password } = this.loginForm.value;

    this.authService.login(matricula, password).subscribe({
      next: (response) => {
        // Si el login es exitoso, guarda el token
        this.authService.saveToken(response.token);
        console.log(response.token);

        // Guardar el ID del alumno en localStorage
        localStorage.setItem('estudianteId', response.alumno.id);

        // Verificar el rol del usuario y redirigir a la ruta correspondiente
        switch (response.alumno.rol) {
          case 1:
            // Rol 1 (alumno): redirigir al panel de alumno
            this.router.navigate(['/estudiantes/home']);
            break;
          case 2:
            // Rol 2 (Empleado): redirigir al panel de alumnos dados de baja
            this.router.navigate(['/estudiante-baja/home']);
            break;
          case 3:
            // Rol 3 (Otro rol): redirigir a panel de profesor de clase
            this.router.navigate(['/profesor-clase/home']);
            break;
          case 4:
            // Rol 4 (Otro rol): redirigir a panel de profesor extracurricular
            this.router.navigate(['/profesor-ext/home']);
            break;
          case 5:
            // Rol 5 (Otro rol): redirigir a panel de servicios escolares
            this.router.navigate(['/servicios-escolares/home']);
            break;  
          default:
            // Si el rol no es reconocido, muestra un mensaje de error
            this.router.navigate(['/404']);
            break;
        }
      },
      error: (err) => {
        // Manejo de errores
        this.errorMessage = 'Matricula o contraseña incorrectos.';
      }
    });
  }
}
