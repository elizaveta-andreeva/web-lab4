import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {CookieService} from 'ngx-cookie-service';

@Component({
    selector: "app-root",
    template: `
        <h1>Log in</h1>
        <form class="container-fluid" (submit)="submitForm($event)">
            <div class="form-row">
                <div class="col-6">
                    <div class="form-group">
                        <label class="font-weight-bold" for="email">Email</label>
                        <input class="form-control" id="email" type="email" [(ngModel)]="email" name="email" required/>
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="text-center p-3 col-12">
                    <button class="btn btn-secondary text-light my-2" type="submit">Log in</button>
                </div>
            </div>
        </form>
    `,
    styleUrls: ["login.component.css"]
})
export class LoginComponent {
    email: string = "";

    constructor(private cookieService: CookieService, private http: HttpClient, private router: Router) {

    }

    submitForm(event: Event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append("email", this.email);

        this.http.post("http://localhost:3000/login", formData).subscribe(
            (response) => {
                this.cookieService.set('userId', String(response));
                this.router.navigate(['/home']);
            },
            (error) => {
                console.error("Ошибка", error);
            }
        );
    }
}
