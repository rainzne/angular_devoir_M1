import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenduDirective } from '../shared/rendu.directive';
import { NonRenduDirective } from '../shared/non-rendu.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { Assignment } from './assignment.model';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { AssignmentsService } from '../shared/assignments.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-assignments',
  imports: [CommonModule,
    MatListModule, MatDividerModule, MatButtonModule,
    MatInputModule,MatFormFieldModule,FormsModule,
    MatTableModule, MatPaginatorModule,
  ],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})

export class AssignmentsComponent implements OnInit {
  titre = 'Liste des assignments';
  assignments: Assignment[] = [];
  
  // Pour la pagination
  page = 1;
  limit = 4;
  totalDocs = 2000;
  totalPages = 667;
  pagingCounter = 1;
  hasPrevPage = false;
  hasNextPage = true;
  prevPage = null;
  nextPage = 2;
  // Pour la data table angular
  displayedColumns: string[] = ['nom', 'prof', 'matiere', 'dateDeRendu', 'rendu'];

  // Attention, pour l'injection de service, mettre en private !!! Sinon
  // ça ne marche pas
  constructor(private assignmentsService: AssignmentsService,
              private router: Router) {}

  ngOnInit() {
    console.log("ngOnInit appelé");
    this.getAssignments();
  }

  getAssignments() {
    // Pour la pagination
    this.assignmentsService.getAssignmentsPagines(this.page, this.limit)
      .subscribe({
        next: (data) => {
          console.log("Données reçues :", data);
          this.assignments = data.docs || data; // Adaptez selon la structure de votre réponse
          this.totalDocs = data.totalDocs;
          this.totalPages = data.totalPages;
          this.page = data.page;
          this.limit = data.limit;
        },
        error: (error) => {
          console.error("Erreur lors de la récupération des assignments :", error);
        }
      });
  }

  pageSuivante() {
    this.page++;
    this.getAssignments();
  }

  pagePrecedente() {
    this.page--;
    this.getAssignments();
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getAssignments();
  }
  premierePage() {
    this.page = 1;
    this.getAssignments();
  }

  // Pour le composant material paginator
  onPageEvent(event: any) {
    console.log(event);
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getAssignments();
  }

  getColor(a: any): string {
    if (a.rendu) return 'green';
    else
      return 'red';
  }

  afficheDetail(row: any) {
    console.log("Assignment cliqué:", row);
    
    if (row && row._id) {
      let id = row._id;
      console.log("Navigation vers l'ID:", id);
      this.router.navigate(['/assignments', id]);
    } else {
      console.error("Aucun ID trouvé pour cet assignment:", row);
    }
  }
}
