import {Component, ElementRef, ViewChild} from "@angular/core"
import {HttpClient} from "@angular/common/http";
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: "app-root",
  template: `<h1>{{user?.name}} {{user?.second_name}}</h1>
  <div class="container">
      <img [src]="photoUrl ? photoUrl : ''" alt="">
    <ul class="user-info">
      <li class="user-info">
        <strong>email: </strong> <span> {{user?.email}}</span>
      </li>
      <li class="user-info">
        <strong>birthdate: </strong> <span> {{user?.birthdate}}</span>
      </li>
    </ul>
    <a class="btn btn-secondary text-light my-2 options-button" id="add_news" href="http://localhost:4200/add_news">
      Add news</a>
    <a *ngIf="user?.role === 'admin'" class="btn btn-secondary text-light my-2 options-button" id="admin_module"
       href="http://localhost:3000"> Go to admin module</a>
      <form class="container-fluid" id="photo_form" (submit)="submitPhotoForm()" enctype="multipart/form-data">
          <label for="photo" class="font-weight-bold custom-file-upload">Upload photo</label>
          <input type="file" id="photo" (change)="handlePhotoChange($event)" name="image" style="display: none">
          <button class="btn btn-secondary text-light my-2" type="submit">Submit</button>
      </form>
    <button id="remove_button" *ngIf="photoUrl" (click)="removePhoto()">Remove photo</button>
  </div>`,
  styleUrls: ['./home.component.css'],
  host: {'collision-id': 'App2Component'},
})
export class HomeComponent {
  userId: number | undefined;
  user: any;
  actionUrl: string | undefined;
  selectedPhoto: File | null = null;
  photoUrl: string | null = null;
  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  constructor(private cookieService: CookieService, private http: HttpClient) {
  }

  ngOnInit() {
    this.userId = Number(this.cookieService.get('userId'));
    this.actionUrl = `http://localhost:3000/users/${this.userId}/add_photo`;
    this.http.get(`http://localhost:3000/users/${this.userId}/json`)
      .subscribe({
        next: (data) => {
          this.user = data;
            this.photoUrl = this.getPhotoUrl(this.user.photo);
        },
        error: (err) => {
          console.log("Error:", err);
        }
      });
  }

  getPhotoUrl(photo: any) {
    if (photo)
      return `http://localhost:3000${photo.replace(/^\.\.\//, "/")}`;
    else
      return null;
  }

  removePhoto() {
    this.http.post(`http://localhost:3000/users/${this.userId}/delete_photo`, {userId: this.userId})
      .subscribe({
        next: (data) => {
          this.photoUrl = null;
        },
        error: (err) => {
          console.log("Error:", err);
        }
      });
  }

    handlePhotoChange(event: any) {
        this.selectedPhoto = event.target.files[0];

    }

    submitPhotoForm() {
        if (!this.selectedPhoto) {
            return;
        }

        const formData = new FormData();
        formData.append("image", this.selectedPhoto);

        this.http.post(`http://localhost:3000/users/${this.userId}/add_photo`, formData).subscribe(
            (response) => {
                this.photoUrl = this.getPhotoUrl(response);
                this.selectedPhoto = null;
            },
            (error) => {
                console.error("Error", error);
            }
        );
    }

}
