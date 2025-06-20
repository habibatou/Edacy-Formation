import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-produit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-produit.component.html',
  styleUrl: './create-produit.component.css'
})
export class CreateProduitComponent {
 form: FormGroup;
    constructor( 
        private fb: FormBuilder,
        private router: Router,
        private prodService: ProductService
      ) {
        this.form = this.fb.group({
          nom: ['', Validators.required],
          description : ['', Validators.required],
          code: ['', Validators.required],
          prix: ['', Validators.required],
          categorieId: [1, Validators.required]
        });      
  }
  onSubmit() {
    if (this.form.invalid) return;
     this.prodService.createProduit(this.form.value).subscribe({
      next: () => this.router.navigateByUrl('/prods'),
    });
  }
}
