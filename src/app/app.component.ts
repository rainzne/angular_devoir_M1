import { Component, ViewChild } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSidenav } from '@angular/material/sidenav';
import { AssignmentsService } from './shared/assignments.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; 
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { LoginComponent } from './login/login.component';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink, 
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule, 
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatSlideToggleModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  titre = 'Premier projet Angular';
  opened = false;
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  genererDonneesDeTest() {
    console.log("Génération des données de test");
    //this.assignmentsService.peuplerBD()

    this.assignmentsService.peuplerBDavecForkJoin()
    .subscribe(() => {
      console.log("Toutes les données de test ont été insérées");

      // Je navigue vers la page qui affiche la liste des assignments
      window.location.href = '/home';
    });
  }
  
    login() {
    // Si déjà connecté, on déconnecte
    if(this.authService.loggedIn) {
      this.authService.logout();
      this.router.navigate(['/home']);
      return;
    }

    // Sinon, on ouvre le dialogue de connexion
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // L'utilisateur s'est connecté avec succès
        this.router.navigate(['/home']);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
    return;
  }
}