import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['../back-office.component.css']
})
export class historyComponent implements OnInit {
  selectedFiles: FileList;
  currentFile: File;
  fileInfos: Observable<any>;

  Alldemandes: any;
  spinner: any;
  Editt: any = false;
  add: any;
  selectedPartimoine: any;
  submitted = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  form: any = {
    titre: null,
    type: null,
    lieu: null,
    prix: null,
    description: null,
  };
  constructor(private userservice: UserService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.userservice.getAlldemandes().subscribe(
      data => {
        this.Alldemandes = data.filter(demande => demande.status == "waiting");
        console.log(this.Alldemandes);
        console.log(data);
      },
      err => {
        console.log(err.error);
      }
    );
  }

  Refuse(id: any) {
    this.spinner = true;

    console.log("Delete" + id)
    this.userservice.RefuseDemande(id)
      .subscribe(data => {
        console.log(data)
      }, err => {
        if (err.status == 200) {
        } else {
        }
      })
    setTimeout(() => {
      this.ngOnInit();
    this.spinner = false;
    }, 2000)
  }
  Accept(id:any){
    this.spinner = true;

    console.log("Delete" + id)
    this.userservice.AcceptDemande(id)
      .subscribe(data => {
        console.log(data)
      }, err => {
        if (err.status == 200) {
        } else {
        }
      })
    setTimeout(() => {
      this.ngOnInit();
    this.spinner = false;
    }, 2000)
  }

  
  
}

