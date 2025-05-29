import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatOptionModule,provideNativeDateAdapter} from '@angular/material/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select'; 
import { CommonModule } from '@angular/common';

@Component({
  providers: [provideNativeDateAdapter()],
  selector: 'app-add-assignment',
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
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css'

})
export class AddAssignmentComponent  {
  // Pour le formulaire d'ajout
  nomDevoir = "";
  prof = "";
  nomMatiere = "";
  auteur = ""; 
  dateDeRendu!:string;
  photo = "";
  photo_prof = "";
  // matieres: string[] = ['Web', '3Dgame', 'Angular']; // Liste des matières
  matiere = ""; // Valeur sélectionnée

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

  constructor(private assignmentsService:AssignmentsService, 
              private router:Router) {}
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

 
  
onSubmit(event:any) {
    console.log(`On a soumis le formulaire nom = ${this.nomDevoir}, 
      dateDeRendu = ${this.dateDeRendu}`);

      // On ne crée un nouvel assignment que si le formulaire est valide
      // c'est-à-dire si le nom du devoir n'est pas vide et si la date de rendu est bien définie
      if(this.nomDevoir == "" || this.dateDeRendu == null) {
        console.log("Formulaire invalide");
        return;
      }

      let a = new Assignment();
      a.nom = this.nomDevoir;
      a.prof = this.prof;
      a.matiere = this.matiere; // <-- Use the selected value
      a.auteur = this.auteur;
      a.dateDeRendu = this.dateDeRendu;
      a.rendu = false;
      a.photo = this.photo;
      a.photo_prof = this.photo_prof;

      // On envoie l'assignment vers le service pour insertion
      this.assignmentsService.addAssignment(a)
      .subscribe(message => {
        console.log(message);

       // On va naviguer vers la page qui affiche la liste des assignments
       // c'est la route par défaut (/ ou /home)
       this.router.navigate(['/home']);
      });
  }

}
