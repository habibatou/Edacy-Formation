import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Produit } from '../models/produit.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  standalone : true
})
export class ProductsComponent implements OnInit {

   private prodService = inject(ProductService);
   produits: Produit[] | null = null;   
   private router = inject(Router);   

  ngOnInit() {
    this.prodService.getAllProducts().subscribe({
      next: data => this.produits = data,
      error: err => console.error('Erreur API :', err)
    });
  }
  
  loadProducts(): void {
    this.prodService.getAllProducts().subscribe(data => {
      this.produits = data;
    });
  }
 handleDelete(p: Produit): void {

    this.prodService.deleteProduct(p.id).subscribe({
      next: () => {
        this.loadProducts();
      },
      error: err => console.error('Suppression impossible :', err),
    });
  }
  handleEdit(product: Produit): void {
    this.router.navigate(['/editProduit', product.id]);
  }


}
