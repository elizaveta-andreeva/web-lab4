import {Component} from "@angular/core"
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: "app-root",
  template: `<h1>All users</h1>
  <div class="card-container">
      <div class="user-card" *ngFor="let user of allUsers">
          <div class="user-title">
              <h2 class="card-link"> {{user.second_name}} {{user.name}} </h2>
          </div>
          <div class="user-photo">
              <img [src]="getFriendPhotoUrl(user.photo)" width="" alt="">
          </div>
          <div class="user-info">
              <p><strong>email: </strong> <span> {{user.email}} </span></p>
              <p><strong>birthdate: </strong> <span> {{user.birthdate}} </span></p>
              <button (click)="addToFriends(user)">Add friend</button>
          </div>
      </div>
  </div>
  `,
  styleUrls: ['./allUsers.component.css'],
  host: {'collision-id': 'App1Component'},
})
export class AllUsersComponent {
  userId: number | undefined;
  allUsers: any;

  constructor(private cookieService: CookieService, private http: HttpClient) {
  }

  ngOnInit() {
    this.userId = Number(this.cookieService.get('userId'));
    this.http.get(`http://localhost:3000/users/${this.userId}/all_users/json`)
      .subscribe({
        next: (data) => {
          this.allUsers = data;
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
  addToFriends(user: any) {
    this.http.post(`http://localhost:3000/users/${this.userId}/add_friend`, { friendId: user.id })
      .subscribe({
        next: (data) => {
          this.allUsers = this.allUsers.filter((u: { id: any; }) => u.id !== user.id);
        },
        error: (err) => {
          console.log("Error:", err);
        }
      });
  }
}
