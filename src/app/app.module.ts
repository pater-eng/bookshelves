import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListComponent } from './book-list/book-list.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { BooksService } from './services/books.service';
import { AuthGuardService } from './services/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";

const appRoutes: Routes =[
  {path: 'auth/signup', component: SignupComponent },
  {path: 'auth/signin', component: SigninComponent },
  {path: 'books', canActivate: [AuthGuardService] ,component: BookListComponent },
  // creation nouveau livre
  {path: 'books/new',canActivate: [AuthGuardService] , component: BookFormComponent },
  // book pour visualiser un seul livre
  {path: 'books/view/:id', canActivate: [AuthGuardService] ,component: SingleBookComponent },
  //ici sont les routes vides. elles sont rediriger vers books.
  // pathMatch:'full': signifie que c'est unique si le path es vide
  {path: '', redirectTo: 'books', pathMatch:'full'},
  {path: '**', redirectTo: 'books'}
];



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    BookListComponent,
    SingleBookComponent,
    BookFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService,
             BooksService, 
             AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
