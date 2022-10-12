import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-offre-manager',
  templateUrl: './offre-manager.component.html',
  styleUrls: ['../back-office.component.css']
})
export class OffreManagerComponent implements OnInit {
  selectedFiles: FileList;
  currentFile: File;
  fileInfos: Observable<any>;

  Patrimoines: any;
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
    this.userservice.getPatrimoines().subscribe(
      data => {
        this.Patrimoines = data;
        console.log(this.Patrimoines);
        console.log(data);
      },
      err => {
        console.log(err.error);
      }
    );
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles[0]["name"]);
  }
  Delete(id: any) {
    this.spinner = true;

    console.log("Delete" + id)
    this.userservice.DeletePatrimoine(id)
      .subscribe(data => {
        console.log(data)
      }, err => {
        if (err.status == 200) {
          console.log("delete succeeded")
          // this.userservice.getPatrimoines().subscribe(
          //   data => {
          //     this.Patrimoines = data;
          //   },
          //   err => {
          //     console.log(err.error);
          //   }
          // );
        } else {
          console.log("delete failed")
        }
      })
    setTimeout(() => {
      this.userservice.getPatrimoines().subscribe(
        data => {
          this.Patrimoines = data;
          console.log(data)
          this.spinner = false;
        },
        err => {
          console.log(err.error);
        });
    }, 2000)
  }
  Add() {
    this.add = !this.add;
    console.log("addd")
    this.form = {}
  }
  Edit(patrimoine: any) {
    this.Editt = !this.Editt;
    this.selectedPartimoine = patrimoine;
    console.log("Edit" + patrimoine.titre)
    this.form = patrimoine;
  }
  sub() {
    this.submitted = true;
    this.isSuccessful = false;
    this.isSignUpFailed = false;
    const { titre, type, prix, lieu, description } = this.form;
    console.log(titre, type, prix, lieu, description);
    this.userservice.addPatrimoine(titre, type, prix, lieu, description, this.selectedFiles[0]["name"]).subscribe(
      data => {
        setTimeout(() => {
          this.currentFile = this.selectedFiles.item(0);
          this.userservice.upload(this.currentFile).subscribe(
            event => {

            },
            err => {

              this.currentFile = undefined;
            });

          this.selectedFiles = undefined;
          this.userservice.getPatrimoines().subscribe(
            data => {
              this.Patrimoines = data;
              console.log(data)
              // this.spinner = false;
              this.isSuccessful = true;
              this.isSignUpFailed = true;
              setTimeout(() => {

                this.add = false;
                this.isSuccessful = false;

              }, 1500);
            },
            err => {
              console.log(err.error);
            });
        }, 3000);
        // this.isSignUpFailed = true;

      },
      err => {
        this.errorMessage = err.error.message;
        // this.isSignUpFailed = true;
      }
    );
  }
  submit() {
    this.submitted = true;
    this.isSuccessful = false;
    this.isSignUpFailed = false;
    const { titre, type, prix, lieu, description } = this.form;
    console.log(titre, type, prix, lieu, description);
    if (this.selectedFiles != undefined) {
      this.userservice.updatePatrimoine(this.selectedPartimoine.id, titre, type, prix, lieu, description, this.selectedFiles[0]["name"]).subscribe(
        data => {
          setTimeout(() => {

            this.currentFile = this.selectedFiles.item(0);
            this.userservice.upload(this.currentFile).subscribe(
              event => {
              },
              err => {
                this.currentFile = undefined;
              });

            this.selectedFiles = undefined;

            this.userservice.getPatrimoines().subscribe(
              data => {
                this.Patrimoines = data;
                console.log(data)
                // this.spinner = false;
                this.isSuccessful = true;
                this.isSignUpFailed = true;
                setTimeout(() => {
                  this.Editt = false;
                  this.isSuccessful = false;
                }, 1500);
              },
              err => {
                console.log(err.error);
              });
          }, 3000);
          // this.isSignUpFailed = true;

        },
        err => {
          this.errorMessage = err.error.message;
          // this.isSignUpFailed = true;
        }
      );
    } else {
      this.userservice.updatePatrimoinee(this.selectedPartimoine.id, titre, type, prix, lieu, description).subscribe(
        data => {
          setTimeout(() => {
            this.userservice.getPatrimoines().subscribe(
              data => {
                this.Patrimoines = data;
                console.log(data)
                // this.spinner = false;
                this.isSuccessful = true;
                this.isSignUpFailed = true;
                setTimeout(() => {
                  this.Editt = false;
                  this.isSuccessful = false;
                }, 1500);
              },
              err => {
                console.log(err.error);
              });
          }, 3000);
        },
        err => {
          this.errorMessage = err.error.message;
        }
      );
    }
  }
}

