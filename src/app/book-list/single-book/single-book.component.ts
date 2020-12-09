import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/model/Book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {

  book: Book;
  constructor(private route: ActivatedRoute,
    private booksService: BooksService,
    private router: Router) { }
    isPhotoDabei = false;
    photoDa: Book;

  ngOnInit() {
    // creation temporaire d'un livre vide pour eviter les erreurs en attendant l'arrivée des livres venant du serveur ou de la DB
    this.book = new Book('','');
    // recupere l'identifiant du book
    const id = this.route.snapshot.params['id'];
    // +id= signifie c'est un number
    this.booksService.getSingleBook(+id).then(
      (book: Book) => {
        if(book.photo !== ''){
          this.book = book;
          this.isPhotoDabei = true;
        }else{
          this.book = book;
          this.isPhotoDabei = false;
        }
      }
    );
  }
// retourne vers l'arriere
  onBack(){
    this.router.navigate(['/books']);
  }

}
