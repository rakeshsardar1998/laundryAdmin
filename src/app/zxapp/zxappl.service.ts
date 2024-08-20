import { Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZXApplService {
  GU = { userId: 0, name: 'GUEST' };
  GA = { APLTX: 'MY APP', PAGTX: '..', PHONE: true, SHOW_SIDENAV: true }; // Added SHOW_SIDENAV
  tokenSubscription: Subscription | undefined;

  constructor(private RT: Router, private LO: Location, private auth: AuthService) {
    this.tokenSubscription = this.auth.getToken().subscribe(data => {
      if (data) {
        const parsedData = JSON.parse(data);
        this.GU.userId = parsedData.data.userId;
        this.GU.name = parsedData.data.name;
      }else {
      }
    });

    // this.RT.events.subscribe(event => {
    //   if (event instanceof NavigationStart) {
    //     if (this.auth.isTokenExpired()) {
    //       window.location.reload();
    //     }
    //   }
    // });
  }

  PAGE(TX: string) {
    this.GA.PAGTX = TX;
    localStorage.setItem('currentPage', this.LO.path());
  }

  USER(ID: number, TX: string) {
    this.GU.userId = ID;
    this.GU.name = TX;
  }

  ISIN(): boolean {
    return this.GU.userId > 0;
  }

  GOTO(url: string, extras?: NavigationExtras) { // Modify method signature
    this.RT.navigate([url], extras); // Pass navigation extras
  }

  OPEN(url: string, parm: string | number) {
    this.RT.navigate([url, parm]);
  }

  BACK() {
    this.LO.back();
  }

  ngOnDestroy() {
    if (this.tokenSubscription) {
      this.tokenSubscription.unsubscribe();
    }
  }
}
