import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogin } from '../models/userLogin.model';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthentificatioServiceService {

  private apiUrl = 'https://localhost:7279'; 

  constructor(private http: HttpClient) {}

    login(request: UserLogin): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log('Login request:', request);
    return this.http.post<any>(`${this.apiUrl}/Connexion`, request, { headers });
  }

  register(userData: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/Inscription`, userData, { headers });
  }


  listUsers(): Observable<User[]> {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
    });

    return this.http.get<User[]>(`${this.apiUrl}/ListUsers`, { headers });
  }
}
