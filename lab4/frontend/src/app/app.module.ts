import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FriendsComponent} from './friends/friends.component';
import {BaseComponent} from './base/base.component';
import {NotFoundComponent} from './notFound/notfound.component';
import {HomeComponent} from "./home/home.component";
import {NewsComponent} from "./news/news.component";
import {RegistrationComponent} from "./registation/registration.component";
import {LoginComponent} from "./registation/login.component";
import {SignupComponent} from "./registation/signup.component";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AddNewsComponent} from "./addNews/addNews.component";
import {UserNewsComponent} from "./userNews/userNews.component";
import {AllUsersComponent} from "./allUsers/allUsers.component";
import {FormsModule} from "@angular/forms";
import {DialogsComponent} from "./dialogs/dialogs.component";
import {DialogUserComponent} from "./dialogUser/dialogUser.component";

const appRoutes: Routes = [
  {path: '', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'home', component: HomeComponent},
  {path: 'friends', component: FriendsComponent},
  {path: 'news', component: NewsComponent},
  {path: 'add_news', component: AddNewsComponent},
  {path: 'user_news', component: UserNewsComponent},
  {path: 'all_users', component: AllUsersComponent},
  {path: 'dialogs', component: DialogsComponent},
  {path: 'dialogs/:id', component: DialogUserComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations:
    [FriendsComponent, BaseComponent, NotFoundComponent,
      HomeComponent, NewsComponent, SignupComponent, LoginComponent, RegistrationComponent, AddNewsComponent,
      UserNewsComponent, AllUsersComponent, DialogsComponent, DialogUserComponent],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes), HttpClientModule, BrowserAnimationsModule, FormsModule],
  bootstrap: [BaseComponent],
  providers: [],
  exports: [RouterModule]
})
export class AppModule {
}
