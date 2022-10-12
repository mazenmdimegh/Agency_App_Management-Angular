import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: 'users', title: 'Users',  icon:'ni-planet text-blue', class: '' },
  { path: 'Offres', title: 'Patrimoines',  icon:'ni-pin-3 text-orange', class: '' },
  { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
  // { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
  // { path: '/log', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
  // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-back-office',
  templateUrl: './back-office.component.html',
  styleUrls: ['./back-office.component.css']
})
export class BackOfficeComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private route: ActivatedRoute, private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
  Offre(){
    this.router.navigate(['compte'], {relativeTo:this.route});
  }
  logout(): void {
    this.tokenStorage.signOut();
    // this.router.navigate(['home'])
    window.location.reload();
}
}
