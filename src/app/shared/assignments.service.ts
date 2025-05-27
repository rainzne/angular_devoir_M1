// filepath: src/app/services/assignments.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { bdInitialAssignments } from './data';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  private apiUrl = 'http://localhost:8010/api';

  constructor(private http: HttpClient) { }

  getAssignments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/assignments`);
  }

  
  getAssignmentsPagines(page: number, limit: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/assignments?page=${page}&limit=${limit}`);
  }

  getAssignment(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/assignments/${id}`);
  }

  addAssignment(assignment: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/assignments`, assignment);
  }

  updateAssignment(assignment: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/assignments`, assignment);
  }

  deleteAssignment(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/assignments/${id}`);
  }

  
  peuplerBDavecForkJoin(): Observable<any> {
    const requests = bdInitialAssignments.map(assignment => 
      this.addAssignment(assignment)
    );
    return forkJoin(requests);
  }
}