import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss', '../back-office/back-office.component.css']
})
export class historiqueComponent implements OnInit {
  Alldemandes: any;
  roles: string[] = [];
  username = "";

  constructor(private userService: UserService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getUser().roles;
    }
    const user = this.tokenStorage.getUser();
    this.roles = user.roles;

    console.log(this.roles[0])
    this.username = user.username;
    console.log(this.username)
    this.userService.getAlldemandes().subscribe(
      data => {
        this.Alldemandes = data.filter(demande => demande.username == this.username);
        console.log(this.Alldemandes);
        console.log(data);
      },
      err => {
        console.log(err.error);
      }
    );
  }


}
