import {Component, OnDestroy} from "@angular/core"
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {DialogService} from "../dialogService/dialog.service";

@Component({
  selector: "app-root",
  template: `
    <h1>Dialog</h1>
    <input
      [(ngModel)]="newMessage"
      (keyup)="$event.keyCode == 13 && sendMessage()"
    />
    <button (click)="sendMessage()">Send Message</button>
    <ul class="news-list">
      <li class="news-item" *ngFor="let message of messageList">
        <div class="news-author">{{message.author}}</div>
        <div class="news-message">{{message.message}}</div>
        <div class="news-date">{{message.date | date: 'medium'}}</div>
      </li>
    </ul>
    <ul class="news-list">
      <li class="news-item" *ngFor="let message of messages">
        <div class="news-author">{{message.author}}</div>
        <div class="news-message">{{message.message}}</div>
        <div class="news-date">{{message.date | date: 'medium'}}</div>
      </li>
    </ul>
  `,
  styleUrls: ['./dialogUser.component.css'],
  host: {'collision-id': 'App1Component'},
})
export class DialogUserComponent implements OnDestroy {
  user: any;
  friend: any;
  userId: number | undefined;
  friendId: number | undefined;
  messageList: any[] = [];
  newMessage: any = null;
  messages: any = [];

  private destroy$: Subject<void> = new Subject<void>();
  private initialized = false;

  constructor(private dialogService: DialogService, private route: ActivatedRoute, private cookieService: CookieService, private http: HttpClient) {
    this.route.params.subscribe(params => {
      this.friendId = +params['id'];
    });

    this.dialogService.getNewMessage()
      .pipe(takeUntil(this.destroy$))
      .subscribe((message: any) => {
        if (this.initialized) {
          this.messageList.unshift(message);
        }
      });
  }

  ngOnInit() {
    this.userId = Number(this.cookieService.get('userId'));
    this.http.post(`http://localhost:3000/users/${this.userId}/get_friend_messages`, {friendId: this.friendId})
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.messages = data;
          this.initialized = true;
        },
        error: (err) => {
          console.log("Error:", err);
        }
      });

    this.http.get(`http://localhost:3000/users/${this.userId}/json`)
      .subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (err) => {
          console.log("Error:", err);
        }
      });

    this.http.get(`http://localhost:3000/users/${this.friendId}/json`)
      .subscribe({
        next: (data) => {
          this.friend = data;
        },
        error: (err) => {
          console.log("Error:", err);
        }
      });

  }

  sendMessage() {
    const data = {
      from: this.userId,
      message: this.newMessage,
      date: new Date()
    };

    this.http.post(`http://localhost:3000/users/${this.friendId}/add_message`, {message: data})
      .subscribe({
        next: (data) => {
        },
        error: (err) => {
          console.log("Error:", err);
        }
      });

    const serviceData = {
      author: this.user.name + ' ' + this.user.second_name,
      message: this.newMessage,
      date: new Date()
    };

    this.dialogService.sendMessage(serviceData);
    this.newMessage = null;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
