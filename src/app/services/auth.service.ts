import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';
const Service_API = "http://localhost:8080/api/offres"

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public host: string = "http://localhost:8081";
  constructor(private httpClient: HttpClient) { }
  public AddStudent(body: any) {
    return this.httpClient.post(this.host + "/addEtudiant", body);
  }
  public AddEntrepreneur(body: any) {
    return this.httpClient.post(this.host + "/entrepreneurEntities", body);
  }
  public getOffre(page: number, size: number) {
    return this.httpClient.get(Service_API + "/all");

  }
  login(username: string, password: string): Observable<any> {
    return this.httpClient.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  registerC(username: string, email: string, password: string, faculte: string, promotion: number, ncin: number, tel: number, gouvernorat: string): Observable<any> {
    return this.httpClient.post(AUTH_API + 'formC', {
      username,
      email,
      password,
      faculte,
      promotion,
      ncin, tel, gouvernorat
    }, httpOptions);
  }
  registerE(username: string, email: string, password: string, ncin: number, tel: number, gouvernorat: string): Observable<any> {
    return this.httpClient.post(AUTH_API + 'formE', {
      username,
      email,
      password,
      ncin,
      tel,
      gouvernorat
    }, httpOptions);
  }
  updateE(username: string, email: string, password: string, ncin: number, tel: number, gouvernorat: string, societe: string): Observable<any> {
    return this.httpClient.post(AUTH_API + 'updateE', {
      username,
      email,
      password,
      ncin,
      tel,
      gouvernorat,
      societe
    }, httpOptions);
  }
}