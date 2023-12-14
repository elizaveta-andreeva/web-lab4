import {Component} from "@angular/core"
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {NewsService} from "../newsService/news.service";

@Component({
  selector: "app-root",
  template: `<h1>Add message</h1>
  <input
    [(ngModel)]="newMessage"
    (keyup)="$event.keyCode == 13 && sendMessage()"
  />
  <button (click)="sendMessage()">Send Message</button>
  `,
  styleUrls: ['./addNews.component.css'],
  host: {'collision-id': 'App3Component'},
})
export class AddNewsComponent {
  userId: number | undefined;
  user: any;
  newMessage: any = null;


  constructor(private newsService: NewsService, private cookieService: CookieService, private http: HttpClient) {
  }

  ngOnInit() {
    this.userId = Number(this.cookieService.get('userId'));
    this.http.get(`http://localhost:3000/users/${this.userId}/json`)
      .subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (err) => {
          console.log("Error:", err);
        }
      });
  }

  sendMessage() {
    const data = {
      author: this.user.name + ' ' + this.user.second_name,
      text: this.newMessage,
      date: new Date()
    };

    this.http.post(`http://localhost:3000/users/${this.userId}/add_news`, {message: this.newMessage, date: new Date()})
      .subscribe({
        next: (data) => {
        },
        error: (err) => {
          console.log("Error:", err);
        }
      });

    this.newsService.sendMessage(data);
    this.newMessage = null;
  }

}
