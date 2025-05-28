import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from '../../shared/assignments.service';
import { Assignment } from '../assignment.model';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-assignment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    MatInputModule, 
    MatButtonModule, 
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './edit-assignment.component.html',
  styleUrl: './edit-assignment.component.css'
})
export class EditAssignmentComponent implements OnInit {
  assignment!: Assignment;
  nomAssignment!: string;
  dateDeRendu!: Date; // Pour le datepicker Angular Material
  
  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAssignment();
  }

  getAssignment(): void {
    const id: string = this.route.snapshot.params['id'];
    
    this.assignmentsService.getAssignment(id).subscribe(assignment => {
      this.assignment = assignment;
      this.nomAssignment = assignment.nom;
      
      // Conversion string vers Date pour le datepicker
      if (assignment.dateDeRendu) {
        // Si la date est au format MM/dd/yyyy
        this.dateDeRendu = new Date(assignment.dateDeRendu);
      }
    });
  }

  onSaveAssignment() {
    if (!this.assignment) return;
    
    // Mise à jour des valeurs
    this.assignment.nom = this.nomAssignment;
    
    // Conversion Date vers string pour l'API
    if (this.dateDeRendu) {
      // Format MM/dd/yyyy pour correspondre à vos données
      const month = (this.dateDeRendu.getMonth() + 1).toString().padStart(2, '0');
      const day = this.dateDeRendu.getDate().toString().padStart(2, '0');
      const year = this.dateDeRendu.getFullYear();
      this.assignment.dateDeRendu = `${month}/${day}/${year}`;
    }

    this.assignmentsService.updateAssignment(this.assignment).subscribe(message => {
      console.log(message);
      this.router.navigate(['/home']);
    });
  }
}

