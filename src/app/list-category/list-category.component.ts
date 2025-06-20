import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/categorie.model';

@Component({
  selector: 'app-list-category',
  imports: [],
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.css'
})
export class ListCategoryComponent implements OnInit {

    private categioryService = inject(CategoryService);
   categories: Category[] | null = null;   
   private router = inject(Router);   

  ngOnInit() {
    this.categioryService.getAllCategories().subscribe({
      next: data => this.categories = data,
      error: err => console.error('Erreur API :', err)
    });
  }
}
