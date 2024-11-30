import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup; // ¡Operador para asegurar la inicialización!
  hidePassword: boolean = true; // Nueva propiedad para alternar visibilidad de contraseña

  constructor(private fb: FormBuilder,
    private snackBar : MatSnackBar,
    private authService : AuthService,
    private router: Router){

    }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword; // Alterna el valor de `hidePassword`
  }

  onSubmit(): void {
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;

    if(password !== confirmPassword){
      this.snackBar.open('Las contraseñas no coinciden!!.','Cerrar',{duration:5000,panelClass:'error-snackbar'});
      return;
    }

    this.authService.register(this.signupForm.value).subscribe(
      (response) =>{
        this.snackBar.open('Registro Exitoso!', 'Cerrar',{duration:5000});
        this.router.navigateByUrl("/login");
      },
      (error) =>{
        this.snackBar.open('Registro fallido. Intentelo de nuevo', 'Cerrar',{duration:5000, panelClass : 'error-snackbar'});
      }
    )
  }
}
