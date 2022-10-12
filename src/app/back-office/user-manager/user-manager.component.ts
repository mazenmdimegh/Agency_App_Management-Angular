import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['../back-office.component.css']
})
export class UserManagerComponent implements OnInit {
  users: any;
  spinner: any;
  Editt: any;
  selectedUser: any;
  submitted = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  form: any = {
    username: null,
    email: null,
    password: null,
    societe: null,
    ncin: null,
    tel: null,
    gouvernorat: null,
  };
  constructor(private userservice: UserService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.userservice.getUsers().subscribe(
      data => {
        this.users = data.filter(user => user.roles[0]["id"] != 1);
        console.log(this.users);
        console.log(data);
      },
      err => {
        console.log(err.error);
      }
    );
  }
  Delete(id: any) {
    this.spinner = true;

    console.log("Delete" + id)
    this.userservice.DeleteUser(id)
      .subscribe(data => {
        console.log(data)
      }, err => {
        if (err.status == 200) {
          console.log("delete succeeded")
          this.userservice.getUsers().subscribe(
            data => {
              this.users = data.filter(user => user.roles[0]["id"] != 1);
            },
            err => {
              console.log(err.error);
            }
          );
        } else {
          console.log("delete failed")
        }
      })
    setTimeout(() => {
      this.userservice.getUsers().subscribe(
        data => {
          this.users = data.filter(user => user.roles[0]["id"] != 1);
          console.log(data)
          this.spinner = false;
        },
        err => {
          console.log(err.error);
        });
    }, 2000)
  }
  Edit(user: any) {
    this.Editt = !this.Editt;
    this.selectedUser = user;
    console.log("Edit" + user.username)
    this.form = user;
    this.form.password = ""
  }
  sub() {
    this.submitted = true;
    this.isSuccessful = false;
    this.isSignUpFailed = false;
    const { username, email, password, ncin, tel, gouvernorat } = this.form;
    console.log(username, email, password, ncin, tel, gouvernorat);
    this.userservice.updateUser(this.selectedUser.id, username, email, password, ncin, tel, gouvernorat).subscribe(
      data => {

        // 

        setTimeout(() => {

          this.userservice.getUsers().subscribe(
            data => {
              this.users = data.filter(user => user.roles[0]["id"] != 1);
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
  }
  
}
