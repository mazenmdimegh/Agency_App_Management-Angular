import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-alternance',
  templateUrl: './acheter.component.html',
  styleUrls: ['./acheter.component.scss']
})
export class AcheterComponent implements OnInit {
  public Patrimoines:any;
 
  constructor(private userService:UserService,private service:TokenStorageService) { }

  ngOnInit() {
    this.userService.getPatrimoines()
    .subscribe(data=>{ 
      this.Patrimoines=data.filter(patrimoine=> patrimoine.type=="Achat"); 
      console.log(this.Patrimoines)     
      
    })
  }
  
  
}
