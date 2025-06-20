import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
  standalone: true
})
export class EditProductComponent implements OnInit {
 private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private produitService = inject(ProductService);


  form = this.fb.group({
          nom: ['', Validators.required],
          description : ['', Validators.required],
          code: ['', Validators.required],
          prix: [0, Validators.required],
          categorieId: [1, Validators.required],
          actif: [false, Validators.required]
        });      
  

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.produitService.getProductById(id).subscribe(prod => {
      this.form.patchValue(prod);
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.produitService.updateProduct(id, this.form.value).subscribe(() => {
      this.router.navigate(['/prods']);
    });
  }
}
