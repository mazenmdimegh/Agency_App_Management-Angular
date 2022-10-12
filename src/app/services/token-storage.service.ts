import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_Favoris = 'USER_Favoris';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  favoris=[];
  fav=[];
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  // --------------------------------------------------------------
  // --------------------------------------------------------------
  // --------------------------------------------------------------
  // --------------------------------------------------------------

  public addFavoris(user: any): void {
    if (window.sessionStorage.getItem(USER_Favoris)==undefined){
    
    this.favoris.push(user);
    let e= {"ids":this.favoris}
    window.sessionStorage.setItem(USER_Favoris, JSON.stringify(e));
    console.log("empty")
  }else{
    let f=JSON.parse(window.sessionStorage.getItem(USER_Favoris));
    this.favoris=[]
    console.log("adddFavService")
    for (let i = 0; i < f.ids["length"]; i++) {
      this.favoris.push(f.ids[i])
    }
    this.favoris.push(user)
    let e= {"ids":this.favoris}
    window.sessionStorage.setItem(USER_Favoris, JSON.stringify(e));
  }
    
  }
  public removeFavoris(id: any): void {
    if (window.sessionStorage.getItem(USER_Favoris)){
      let f=JSON.parse(window.sessionStorage.getItem(USER_Favoris));
      this.fav=[]
      console.log("RemoveFavService")
      for (let i = 0; i < f.ids["length"]; i++) {
        if(f.ids[i]!=id)
        this.fav.push(f.ids[i])
      }
      let e= {"ids":this.fav}
      window.sessionStorage.setItem(USER_Favoris, JSON.stringify(e));
      // window.location.reload();
    }
  }

  public getFavoris(): any {
    const user = window.sessionStorage.getItem(USER_Favoris);
    if (user) {
      return user;
    }

    return {};
  }
  // --------------------------------------------------------------
  // --------------------------------------------------------------
  // --------------------------------------------------------------
  // --------------------------------------------------------------

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}
