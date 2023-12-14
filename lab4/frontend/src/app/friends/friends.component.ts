import {Component} from "@angular/core"
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: "app-root",
  template: `<h1>Friends</h1>
  <div class="card-container">
    <div class="user-card" *ngFor="let friend of friends">
      <div class="user-title">
        <h2 class="card-link"> {{friend.second_name}} {{friend.name}} </h2>
      </div>
      <div class="user-photo">
        <img [src]="getFriendPhotoUrl(friend.photo)" width="" alt="">
      </div>
      <div class="user-info">
        <p><strong>email: </strong> <span> {{friend.email}} </span></p>
        <p><strong>birthdate: </strong> <span> {{friend.birthdate}} </span></p>
        <button (click)="deleteFriend(friend)">Remove friend</button>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['./friends.component.css'],
  host: {'collision-id': 'App1Component'},
})
export class FriendsComponent {
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
