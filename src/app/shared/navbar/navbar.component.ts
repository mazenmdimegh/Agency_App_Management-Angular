import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OffreService } from 'src/app/services/offre.service';
import { stringify } from 'querystring';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss', '../../../assets/vendor/font-awesome/css/font-awesome.css'],
    encapsulation: ViewEncapsulation.None,
    styles: [`
    .modal-content {
        margin: 106px 0 0 0;
    }
    .dark-modal .modal-content {
  
      background-color: #292b2c;
      color: white;
    }
    .modal-dialog{
        margin: 0 20vw;
      }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
    .c{
        text-align: center;
    border-radius: 25px;
    }
  `]
})
export class NavbarComponent implements OnInit {
    form: any = {
        titre: null,
        duree: null,
        lieu: null,
        societe: null,
        service: null,
        edate: null,
        categorie: null,
        type: null,
        description: null
    };
    public isCollapsed = true;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    public LoggedIn = false;
    public isSuccessful = false;
    public isSignUpFailed = false
    roles: string[] = [];
    username = "";
    id = "";
    submitted = false;
    constructor(public location: Location, private router: Router, private tokenStorage: TokenStorageService, private modalService: NgbModal, private offreservice: OffreService) {
    }

    ngOnInit() {
        if (this.tokenStorage.getToken()) {
            this.router.events.subscribe((event) => {
                this.isCollapsed = true;
                if (event instanceof NavigationStart) {
                    if (event.url != this.lastPoppedUrl)
                        this.yScrollStack.push(window.scrollY);
                } else if (event instanceof NavigationEnd) {
                    if (event.url == this.lastPoppedUrl) {
                        this.lastPoppedUrl = undefined;
                        window.scrollTo(0, this.yScrollStack.pop());
                    } else
                        window.scrollTo(0, 0);
                }
            });
            this.location.subscribe((ev: PopStateEvent) => {
                this.lastPoppedUrl = ev.url;
            });

            if (this.tokenStorage.getToken()) {
                this.LoggedIn = true;
                this.roles = this.tokenStorage.getUser().roles;
            }
            const user = this.tokenStorage.getUser();
            this.roles = user.roles;

            console.log(this.roles[0])
            this.username = user.username;
            this.id = user.id;
            console.log(this.id)
        }
        if (this.roles[0] != 'ROLE_ADMIN' && window.location.pathname.split("/")[1] == "backOffice") {
            this.router.navigate(['home'])

        }
        // console.log((window.location.pathname).split("/")[1])
    }
    openScrollableContent(quanticfy) {
        this.modalService.open(quanticfy, { scrollable: true });
    }
    isHome() {
        var titlee = this.location.prepareExternalUrl(this.location.path());

        if (titlee === '#/home') {
            return true;
        }
        else {
            return false;
        }
    }
    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee === '#/documentation') {
            return true;
        }
        else {
            return false;
        }
    }
    logout(): void {
        this.tokenStorage.signOut();
        this.router.navigate(['home'])
        window.location.reload();
    }
    a() {
        this.isSuccessful = true;
        this.submitted = false;
    }
    onSubmit(): void {
        console.log("suuuuub")
        const { titre, duree, lieu, societe, service, edate, categorie, type, description } = this.form;
        console.log(titre, duree, lieu, societe, service, edate, categorie, type, description);

        this.offreservice.AddOffre(parseInt(this.id), titre, description, duree, lieu, societe, service, categorie, edate.year + "-" + edate.month + "-" + edate.day, type).subscribe(
            data => {
                console.log(data);
                this.isSignUpFailed = false;
                this.submitted = true;
                setTimeout(() => this.a(), 2000);
                this.isSignUpFailed = false;
                setTimeout(() => this.modalService.dismissAll(), 3000);
            },
            err => {
                this.isSignUpFailed = true;
            }
        );
    }
    sub() {
        console.log("suuuuub222")

        // const { titre, duree, lieu, societe, service, edate, categorie, type, description } = this.form;
        // // console.log(edate.year+"-"+edate.month+"-"+edate.day);
        // console.log(this.id, titre, duree, lieu, societe, service, edate, categorie, type, description);
    }
}
