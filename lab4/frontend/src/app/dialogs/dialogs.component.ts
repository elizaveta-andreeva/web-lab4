import {Component} from "@angular/core"
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: "app-root",
  template: `<h1>Friends</h1>
  <div class="card-container">
    <div class="user-card" *ngFor="let friend of friends">
      <div class="user-title">
        <a [href]="'/dialogs/' + friend.id" class="card-link"> {{friend.second_name}} {{friend.name}} </a>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['./dialogs.component.css'],
  host: {'collision-id': 'App1Component'},
})
export class DialogsComponent {
  userId: number | undefined;
  friends: any;

  constructor(private cookieService: CookieService, private http: HttpClient) {
  }

  ngOnInit() {
    this.userId = Number(this.cookieService.get('userId'));
    this.http.get(`http://localhost:3000/users/${this.userId}/friends/json`)
      .subscribe({
        next: (data) => {
          this.friends = data;
        },
        error: (err) => {
          console.log("Error:", err);
        }
      });
  }

  getFriendPhotoUrl(photo: string) {
    if (photo) {
      return `http://localhost:3000${photo.replace(/^\.\.\//, "/")}`;
    } else {
      return null;
    }
  }

  deleteFriend(user: any) {
    this.http.post(`http://localhost:3000/users/${this.userId}/delete_friend`, { friendId: user.id })
      .subscribe({
        next: (data) => {
          this.friends = this.friends.filter((u: { id: any; }) => u.id !== user.id);
        },
        error: (err) => {
          console.log("Error:", err);
        }
      });
  }
}
