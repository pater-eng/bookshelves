import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from '../model/Book';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {
books: Book[];
booksSubscription: Subscription;

  constructor(private booksService: BooksService, private router: Router) { }

  ngOnInit(): void {
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      // ici je recupere un array de Books
      (books: Book[]) =>{
        this.books = books;
      }
    );
    // ici le service ira chercher les livres et le gardera mm si on actualise, on vera tjrs le ou les livres 
    this.booksService.getBooks();
    this.booksService.emitBooks();
  }

  onNewBook(){
    // ici c'est /books/new
    this.router.navigate(['/books', 'new']);
  }

  onDeleteBook(book: Book){
    this.booksService.removeBook(book);
  }
  onViewBook(id: number){
    // ici c'est /books/view/id
    this.router.navigate(['/books', 'view', id]);
  }

  ngOnDestroy(){
    this.booksSubscription.unsubscribe();
  }

}
