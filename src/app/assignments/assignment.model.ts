export class Assignment {
  _id?: string;
  nom!: string;
  dateDeRendu!: string;
  rendu!: boolean;
  auteur!: string;
  note?: number | null;
  matiere!: string;
  photo?: string;
  prof!: string;
  photo_prof?: string;
  remarque?: string;
}