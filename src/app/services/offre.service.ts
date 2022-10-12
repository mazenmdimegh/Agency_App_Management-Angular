import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const Service_API = "http://localhost:8080/api/offres"
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  constructor(private httpClient: HttpClient) { }


  public getOffreById( id: number) {
    return this.httpClient.get(Service_API + "/OffreById/"+id);
  }
  public getCandidats( id: number) {
    return this.httpClient.get(Service_API + "/Candidats/"+id);
  }

  public getFavoris(body: any) {
    return this.httpClient.post(Service_API + "/OffreFavorisByArray", body, httpOptions);
  }
  public SuppOffre(id:number){
    return this.httpClient.delete(Service_API + "/deleteById/" + id)
  }
  AddOffre(id:number,titre: string, description: string, duree: string, lieu: string, societe: string, service: string, categorie: string, edate: string, type: string ): Observable<any> {
    return this.httpClient.post(Service_API + '/addOffres/'+id, {
      titre, description, duree, lieu, societe, service, categorie, edate, type 
    }, httpOptions);
  }
// 
  
}