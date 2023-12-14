import {Component, ElementRef, ViewChild} from "@angular/core"
import {HttpClient} from "@angular/common/http";
import {Subscription} from "rxjs";
import {NavigationStart, Router} from "@angular/router";
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: "app-root",
  template: `<h1>Sign up</h1>
    <form class="container-fluid" id="signup" (submit)="submitForm($event)">
    <div class="form-row">
      <div class="col-6">
        <div class="form-group">
          <label class="font-weight-bold" for="user_name">Name</label>
          <input class="form-control" id="user_name" type="text" [(ngModel)]="name" name="name" autofocus="true" required="true"/>
        </div>
        <div class="form-group">
          <label class="font-weight-bold" for="second_name">Second name</label>
          <input class="form-control" id="second_name" type="text" [(ngModel)]="second_name" name="second_name" autofocus="true" required="true"/>
        </div>
        <div class="form-group">
          <label class="font-weight-bold" for="email">Email</label>
          <input class="form-control" id="email" type="email" [(ngModel)]="email" name="email" autofocus="true" required="true"/>
        </div>
        <div class="form-group">
          <label class="font-weight-bold" for="birthdate">Birth date</label>
          <input class="form-control" id="birthdate" type="date" [(ngModel)]="birthdate" name="birthdate" autofocus="true" required="true"/>
        </div>
      </div>
    </div>
    <div class="form-row">
      <div class="text-center p-3 col-12">
        <button class="btn btn-secondary text-light my-2" id="submit_button" type="submit" form="signup">Submit</button>
      </div>
    </div>
  </form>`,
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email: string = "";
  name: string = "";
  second_name: string = "";
  birthdate: string = "";
  private routerSubscription: Subscription;

    constructor(private cookieService: CookieService, private http: HttpClient, private router: Router) {
        this.routerSubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
            }
        });
    }

    submitForm(event: Event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", this.name);
        formData.append("second_name", this.second_name);
        formData.append("email", this.email);
        formData.append("birthdate", this.birthdate);

        this.http.post("http://localhost:3000/signup", formData).subscribe(
            (response) => {
                this.cookieService.set('userId', String(response));
                this.router.navigate(['/home']);
            },
            (error) => {
                console.error("Error", error);
            }
        );
    }
}
