import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produit } from '../models/produit.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://localhost:7279'; 

  constructor(private http: HttpClient) {}

    getAllProducts(): Observable<Produit[]> {

    return this.http.get<Produit[]>(`${this.apiUrl}/ListProduits`);
  }

  deleteProduct(id: number): Observable<void>{
       return this.http.delete<void>(`${this.apiUrl}/DeletProduit/${id}`);  
  }
  createProduit(produit: Produit): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/CreationProduit`, produit, { headers });
  }
  
 updateProduct(id: number, produit: any): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/EditProduit/${id}`, produit);
}

getProductById(id: number): Observable<Produit> {
  return this.http.get<Produit>(`${this.apiUrl}/GetProduitById/${id}`);
}
}
