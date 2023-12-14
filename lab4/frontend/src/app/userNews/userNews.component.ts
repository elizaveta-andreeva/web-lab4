import {Component} from "@angular/core"
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: "app-root",
  template: `<h1>My messages</h1>
  <ul class="news-list">
    <li class="news-item" *ngFor="let message of news">
      <div class="news-author">{{message.author}}</div>
      <div class="news-message">{{message.message}}</div>
      <div class="news-date">{{message.date}}</div>
      </li>
  </ul>`,
  styleUrls: ['./userNews.component.css'],
  host: {'collision-id': 'App6Component'},
})
export class UserNewsComponent {
  userId: number | undefined;
  news: any;

  constructor(private cookieService: CookieService, private http: HttpClient) {
  }

  ngOnInit() {
    this.userId = Number(this.cookieService.get('userId'));
    this.http.get(`http://localhost:3000/users/${this.userId}/news/json`)
      .subscribe({
        next: (data) => {
          this.news = data;
        },
        error: (err) => {
          console.log("Error:", err);
        }
      });
  }
}
