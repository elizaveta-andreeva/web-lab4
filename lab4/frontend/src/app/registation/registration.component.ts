import {Component} from "@angular/core"
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: "app-root",
  template: `<h1>Sign in</h1>
  <div class="options">
    <a class="btn btn-secondary text-light my-2 options-button" id="home" href="http://localhost:4200/login"> Log in</a>
    <a class="btn btn-secondary text-light my-2 options-button" id="friends" href="http://localhost:4200/signup"> Sign
      up</a>
  </div>`,
  styleUrls: ['registration.component.css']
})
export class RegistrationComponent {
  constructor(private cookieService: CookieService) {
    this.cookieService.delete('userId');
  }
  ngOnInit() {
    // this.cookieService.delete('userId');
  }
}
