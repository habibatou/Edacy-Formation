import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/categorie.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'https://localhost:7279'; 

  constructor(private http: HttpClient) {}

    getAllCategories(): Observable<Category[]> {

    return this.http.get<Category[]>(`${this.apiUrl}/ListCategories`);
  }  

}
