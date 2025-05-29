import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatOptionModule,provideNativeDateAdapter} from '@angular/material/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute,Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select'; 
import { CommonModule } from '@angular/common';

@Component({
  providers: [provideNativeDateAdapter()],
  selector: 'app-edit-assignment',
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule
    
  ],
  templateUrl: './edit-assignment.component.html',
  styleUrl: './edit-assignment.component.css'

})
export class EditAssignmentComponent implements OnInit {
  assignment!: Assignment;
  nomDevoir = "";
  prof = "";
  nomMatiere = "";
  auteur = ""; 
  dateDeRendu!:string;
  photo = "";
  photo_prof = "";
  // matieres: string[] = ['Web', '3Dgame', 'Angular']; // Liste des matières
  matiere = ""; 

  matieres = [
    {
      nom: 'Angular',
      prof: 'ProfAngular',
      photo: 'https://fastly.picsum.photos/id/137/4752/3168.jpg?hmac=dGsgAtPkFewFByZXZOmSg0U7Mohr43GyVu3n1AHVIyg',
      photo_prof: 'https://fastly.picsum.photos/id/103/2592/1936.jpg?hmac=aC1FT3vX9bCVMIT-KXjHLhP6vImAcsyGCH49vVkAjPQ'
    },
    {
      nom: 'Web',
      prof: 'ProfWeb',
      photo: 'https://fastly.picsum.photos/id/140/2448/2448.jpg?hmac=zQCgUWz77YSeT2F-IBV7cf_D25TabaB4l4tZChoyRI0',
      photo_prof: 'https://fastly.picsum.photos/id/91/3504/2336.jpg?hmac=tK6z7RReLgUlCuf4flDKeg57o6CUAbgklgLsGL0UowU'
    },
    {
      nom: '3Dgame',
      prof: 'Prof3Dgame',
      photo: 'https://fastly.picsum.photos/id/145/4288/2848.jpg?hmac=UkhcwQUE-vRBFXzDN1trCwWigpm7MXG5Bl5Ji103QG4',
      photo_prof: 'https://fastly.picsum.photos/id/5/5000/3334.jpg?hmac=R_jZuyT1jbcfBlpKFxAb0Q3lof9oJ0kREaxsYV3MgCc'
    }
  ];
  
  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
               onMatiereChange() {
    const matiereSelectionnee = this.matieres.find(m => m.nom === this.matiere);
    if (matiereSelectionnee) {
      this.prof = matiereSelectionnee.prof;
      this.photo = matiereSelectionnee.photo;
      this.photo_prof = matiereSelectionnee.photo_prof;
    } else {
      this.prof = "";
      this.photo = "";
      this.photo_prof = "";
    }
  }


  ngOnInit(): void {
    this.getAssignment();
  }

  getAssignment(): void {
    const id: string = this.route.snapshot.params['id'];
    
    this.assignmentsService.getAssignment(id).subscribe(assignment => {
      this.assignment = assignment;
      this.nomDevoir = assignment.nom;
      this.auteur = assignment.auteur;
        this.dateDeRendu = assignment.dateDeRendu ;
        this.matiere = assignment.matiere ;
        this.prof = assignment.prof ;
        this.photo = assignment.photo;
        this.photo_prof = assignment.photo_prof;

      
     
    });
  }

  onSaveAssignment() {
    if (!this.assignment) return;
    
    // Mettre à jour l'assignment existant au lieu de créer un nouveau
    this.assignment.nom = this.nomDevoir;
    this.assignment.auteur = this.auteur;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.matiere = this.matiere;
    this.assignment.prof = this.prof;
    this.assignment.photo = this.photo;
    this.assignment.photo_prof = this.photo_prof;

    console.log("Assignment à sauvegarder:", this.assignment);

    this.assignmentsService.updateAssignment(this.assignment).subscribe({
      next: (message) => {
       
        this.router.navigate(['/assignments', this.assignment._id]);
      },
      error: (error) => {
        console.error("Erreur lors de la sauvegarde:", error);
      }
    });
  }
}

