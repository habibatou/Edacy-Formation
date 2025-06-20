import { Component, inject } from '@angular/core';
import { AuthentificatioServiceService } from '../services/authentificatio-service.service';
import { User } from '../models/User.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-liste-users',
  imports: [CommonModule],
  templateUrl: './liste-users.component.html',
  styleUrl: './liste-users.component.css'
})
export class ListeUsersComponent {

  private authservice = inject(AuthentificatioServiceService);
   users: User[] | null = null;      

  ngOnInit() {
    this.authservice.listUsers().subscribe({
      next: data => this.users = data,
      error: err => console.error('Erreur API :', err)
    });
  }
}
