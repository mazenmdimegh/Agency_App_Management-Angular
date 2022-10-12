import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    model = {
        left: true,
        middle: false,
        right: false
    };
    Patrimoines: any;
    focus;
    focus1;
    constructor(private userService: UserService) { }

    ngOnInit() {
        this.userService.getPatrimoines()
            .subscribe(data => {
                this.Patrimoines = data;

            })
    }
}
