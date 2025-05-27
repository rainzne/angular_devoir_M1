// filepath: src/app/services/assignments.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { bdInitialAssignments } from './data';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  private baseUri = 'http://localhost:8010/api/assignments';

  constructor(private http: HttpClient) { }

  getAssignments(): Observable<any> {
    return this.http.get(`${this.baseUri}`);
  }

  getAssignmentsPagines(page: number, limit: number): Observable<any> {
    return this.http.get(`${this.baseUri}?page=${page}&limit=${limit}`);
  }

  getAssignment(id: string): Observable<any> {
    return this.http.get(`${this.baseUri}/${id}`);
  }

  addAssignment(assignment: any): Observable<any> {
    return this.http.post(`${this.baseUri}`, assignment);
  }

  updateAssignment(assignment: any): Observable<any> {
    return this.http.put(`${this.baseUri}`, assignment);
  }

  deleteAssignment(id: string): Observable<any> {
    return this.http.delete(`${this.baseUri}/${id}`);
  }

  
  peuplerBDavecForkJoin(): Observable<any> {
    const requests = bdInitialAssignments.map(assignment => 
      this.addAssignment(assignment)
    );
    return forkJoin(requests);
  }
}