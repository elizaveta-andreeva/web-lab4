import { Component, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { NewsService } from "../newsService/news.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-root",
  template: `
      <h1>News</h1>
      <ul class="news-list">
        <li class="news-item" *ngFor="let message of messageList">
          <div class="news-author">{{message.author}}</div>
          <div class="news-message">{{message.text}}</div>
          <div class="news-date">{{message.date | date: 'medium'}}</div>
        </li>
      </ul>
      <ul class="news-list">
          <li class="news-item" *ngFor="let message of news">
              <div class="news-author">{{message.author}}</div>
              <div class="news-message">{{message.message}}</div>
              <div class="news-date">{{message.date | date: 'medium'}}</div>
          </li>
      </ul>
  `,
  styleUrls: ["./news.component.css"],
  host: { 'collision-id': "App3Component" },
})
export class NewsComponent implements OnDestroy {
  userId: number | undefined;
  news: any;
  messageList: any[] = [];
  private destroy$: Subject<void> = new Subject<void>();
  private initialized = false;

  constructor(
    private newsService: NewsService,
    private cookieService: CookieService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.userId = Number(this.cookieService.get("userId"));

    this.http
      .get(`http://localhost:3000/users/${this.userId}/friends_news/json`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.news = data;
        this.initialized = true;
      });

    this.newsService.getNewMessage()
      .pipe(takeUntil(this.destroy$))
      .subscribe((message: any) => {
        if (this.initialized) {
          this.messageList.unshift(message);
        }
      });

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
