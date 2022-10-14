import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const Service_API = "http://localhost:8080/api/users"
const Patri_API = "http://localhost:8080/api/patrimoines"

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<any> {
    return this.httpClient.get(Service_API + "/all");
  }
  getPatrimoines(): Observable<any> {
    return this.httpClient.get(Patri_API + "/all");
  }
  getAlldemandes(): Observable<any> {
    return this.httpClient.get(Patri_API + "/alldemandes");
  }
  DeletePatrimoine(id: any) {
    return this.httpClient.delete(Patri_API + `/deleteById/${id}`);
  }
  DeleteUser(id: any) {
    return this.httpClient.delete(Service_API + `/deleteById/${id}`);
  }
  updateUser(id: any, username: string, email: string, password: string, ncin: number, tel: number, gouvernorat: string): Observable<any> {
    return this.httpClient.put(Service_API + '/' + id, {
      username,
      email,
      password,
      ncin,
      tel,
      gouvernorat
    }, httpOptions);
  }
  addPatrimoine(titre: string, type: string, prix: number, lieu: string, description: string,image_name: String): Observable<any> {
    return this.httpClient.post(Patri_API + '/add', {
      titre,
      type,
      prix,
      lieu,
      description,
      image_name
    }, httpOptions);
  }
  upload(file: File): Observable<HttpEvent<any>> {
    console.log("service");

    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('PUT', `${Patri_API}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpClient.request(req);
  }
  updatePatrimoine(id: any, titre: string, type: string, prix: number, lieu: string, description: string,image_name: String): Observable<any> {
    return this.httpClient.put(Patri_API + '/' + id, {
      titre,
      type,
      prix,
      lieu,
      description,
      image_name
    }, httpOptions);
  }

  updatePatrimoinee(id: any, titre: string, type: string, prix: number, lieu: string, description: string): Observable<any> {
    return this.httpClient.put(Patri_API + '/2/' + id, {
      titre,
      type,
      prix,
      lieu,
      description
    }, httpOptions);
  }
  AddDemande(titre: any, username: string): Observable<any> {
    return this.httpClient.post(Patri_API + '/demande', {
      username,
      titre
    }, httpOptions);
  }
  RefuseDemande(id: any): Observable<any> {
    return this.httpClient.put(Patri_API + '/demande/' + id, {
      "status": "Refused"
    }, httpOptions);
  }
  AcceptDemande(id: any): Observable<any> {
    return this.httpClient.put(Patri_API + '/demande/' + id, {
      "status": "Accepted"
    }, httpOptions);
  }









  public getMesCandidatures(id: number) {
    return this.httpClient.get(Service_API + "/" + id);
  }
  public getMesOffres(id: number) {
    return this.httpClient.get(Service_API + "/MesOffres/" + id);
  }
  public getDet(id: number) {
    return this.httpClient.get(Service_API + "/userDetails/" + id);
  }
  // public getUser( id: number) {
  //   return this.httpClient.get(Service_API + "/"+id);
  // }
  AddDetails(id_Candidat: number, titre: string, siteInternet: string, linkedIn: string, github: string, lettreMotivation: string): Observable<any> {
    return this.httpClient.post(Service_API + '/userDetails', {
      id_Candidat, titre, siteInternet, linkedIn, github, lettreMotivation
    }, httpOptions);
  }

  addcandidature(id_offre: number, id_user: number): Observable<any> {
    return this.httpClient.post(Service_API + '/AddMesCandidatures/' + id_user + '/' + id_offre, {
    }, httpOptions);
  }
}