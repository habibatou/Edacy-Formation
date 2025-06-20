import { Component } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificatioServiceService } from '../services/authentificatio-service.service';
import { CommonModule } from '@angular/common';
import { UserLogin } from '../models/userLogin.model';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    loginForm: FormGroup;
    errorMessage = '';
    constructor( 
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthentificatioServiceService
      ) {
        this.loginForm = this.fb.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
          
        });      
  }
    onSubmit() {
            if (this.loginForm.invalid) return;

            const identifiant: UserLogin = this.loginForm.value;
             
            this.authService.login(identifiant).subscribe({
              next: (res) => {
                console.log('Token reçu :', res)
                localStorage.setItem('token', res); 
                this.router.navigate(['/home']); 
              },
              error: (err) => {  
                console.error('Erreur API :', err)          
                this.errorMessage = 'Nom d’utilisateur ou mot de passe incorrect.';
              },
            });
         
   }
     goToRegister() {
    this.router.navigateByUrl('/register');
  }
}
