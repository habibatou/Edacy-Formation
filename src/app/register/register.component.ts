import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificatioServiceService } from '../services/authentificatio-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;
    constructor( 
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthentificatioServiceService
      ) {
        this.registerForm = this.fb.group({
          username: ['', Validators.required],
          password: ['', Validators.required],
          email: ['', Validators.required],
          prenom: ['', Validators.required],
          nom: ['', Validators.required]
        });      
  }

  onSubmit() {
    if (this.registerForm.invalid) return;
     this.authService.register(this.registerForm.value).subscribe({
      next: () => this.router.navigateByUrl('/login'),
    });
  }
}
