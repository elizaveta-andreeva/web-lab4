import { Component, OnInit, OnDestroy } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Router, NavigationStart } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  template: `
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>

    <div class="sidenav" *ngIf="userId !== 0 && userId !== undefined">
      <ul>
        <li><a id="home" [routerLink]="['home']"> Home</a></li>
        <li><a id="friends" [routerLink]="['friends']"> Friends</a></li>
        <li><a id="all_users" [routerLink]="['all_users']"> All users</a></li>
        <li><a id="news" [routerLink]="['news']"> News</a></li>
        <li><a id="dialogs" [routerLink]="['dialogs']"> Dialogs </a></li>
        <li><a id="logout" (click)="logout()"> Log out</a></li>
      </ul>
    </div>
    <div class="main_group">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./base.component.css'],
})
export class BaseComponent implements OnInit, OnDestroy {
  userId: number | undefined;
  private routerSubscription: Subscription;

  constructor(private cookieService: CookieService, private router: Router) {
    console.log(this.cookieService.get('userId'));
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.userId = Number(this.cookieService.get('userId'));
      }
    });
  }

  ngOnInit() {
    this.userId = Number(this.cookieService.get('userId'));
    console.log(this.userId);
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  logout() {
    this.cookieService.delete('userId');
    this.router.navigate(['/']);
  }
}
