import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  submitted = false;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      const user = this.tokenStorage.getUser();
      this.roles = user.roles;
      if (this.roles[0] == "ROLE_ADMIN") {
        this.router.navigate(['/backOffice/users']);

      } else {
        this.router.navigate(['/home']);

      }
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;
    this.submitted = true;
    this.authService.login(username, password).subscribe(
      data => {
        console.log(data)
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        const favoris = [];
        let e = { "ids": favoris }
        window.sessionStorage.setItem('USER_Favoris', JSON.stringify(e));
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();

      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}