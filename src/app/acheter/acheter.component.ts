import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-alternance',
  templateUrl: './acheter.component.html',
  styleUrls: ['./acheter.component.scss','../home/home.component.scss']
})
export class AcheterComponent implements OnInit {
  public Patrimoines:any;
  Alldemandes: any;
  focus;
  focus1;
  roles: string[] = [];
  username = "";
  constructor(private userService:UserService,private tokenStorage:TokenStorageService) { }

  ngOnInit() {
    this.userService.getPatrimoines()
    .subscribe(data=>{ 
      this.Patrimoines=data.filter(patrimoine=> patrimoine.type=="Achat"); 
      console.log(this.Patrimoines)     
      
    })
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getUser().roles;
  }
  const user = this.tokenStorage.getUser();
  this.roles = user.roles;

  console.log(this.roles[0])
  this.username = user.username;
  console.log(this.username)
  setTimeout(() => {
  this.userService.getAlldemandes().subscribe(
      data => {
        this.Alldemandes = data.filter(demande => demande.username == this.username);
        console.log(this.Alldemandes);
      //   console.log(data);
        console.log(this.Patrimoines);
        for (let i in this.Patrimoines ){
          // console.log(this.Patrimoines[i].titre)
          Object.defineProperty(this.Patrimoines[i], "status", {value:"none"});
          for (let j in this.Alldemandes ){
              
              console.log("none "+this.Patrimoines[i].titre)
              if (this.Patrimoines[i].titre == this.Alldemandes[j].titre ){
                  // this.Patrimoines[i].status = this.Alldemandes[j].status
                  console.log("status "+this.Patrimoines[i].titre)
                  Object.defineProperty(this.Patrimoines[i], "status", {value:this.Alldemandes[j].status});
              }
          }
        }
        console.log(this.Patrimoines);
      },
      err => {
        console.log(err.error);
      }
    );
  }, 500);
    
}
Demande(titre) {
  // console.log(titre);
  // console.log(this.username);
  this.userService.AddDemande(titre, this.username).subscribe(
      data => {
          alert("Demande sent successfully")
          this.ngOnInit();
      },
      err => {
          console.log(err)
      }
  );
}
De(){}
  
}
