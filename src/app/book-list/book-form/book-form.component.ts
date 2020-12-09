import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/Book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
// ici je creer le nouveau livre
export class BookFormComponent implements OnInit {
bookForm: FormGroup;
// on verifie si le livre est actuellement entrain d'etre chargé
fileIsUploading = false;
// le url qu'on va recupere
fileUrl: string;
// ici on signale la fin du chargement du fichier
fileUploaded = false;

  constructor(private formBuilder: FormBuilder,
    private booksService: BooksService,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.bookForm = this.formBuilder.group(
      {
       title: ['',Validators.required],
       author : ['', Validators.required]
      });
  }

  onSaveBook(){
    const title = this.bookForm.get('title').value;
    const author = this.bookForm.get('author').value;
    //c'est ici que je créer mon nouveau book 
    const newBook =  new Book(title,author);
    //on verifier si il ya un Url de fichier. on moment de la creation du livre, on ajoutera egalement la Photo
    if(this.fileUrl && this.fileUrl !==''){
        newBook.photo = this.fileUrl;
    }
    this.booksService.createNewBook(newBook);
    this.router.navigate(['/books']);
    }

    // declenche et met a jour les données
    onUploadFile(file: File){
      this.fileIsUploading = true;
      this.booksService.uploadFile(file).then(
        (url:string)=>{
          this.fileUrl = url;
          // ici je telechargement est fini alors ca devient false
          this.fileIsUploading = false;
          // le Fichier a ete chargé alors true
          this.fileUploaded = true;
        }
      )
    }

    // event vient du DOM et va declencher le Upload du File
    detectFile(event){
       this.onUploadFile(event.target.files[0]); 
    }
}
