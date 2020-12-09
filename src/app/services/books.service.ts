import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Book} from '../model/Book';
import firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class BooksService {
books: Book[]= [];
booksSubject =  new Subject<Book[]>();
  constructor() { }

  // ici j'emet le subject
  emitBooks(){
    this.booksSubject.next(this.books);
  }

  // save a book in Database
  saveBooks(){
    // tt les livres sont enregistré a /books
    firebase.database().ref('/books').set(this.books);
  }
// take all Books from db
// .on(...): reagit au events venant de la db. 
// Et à chaque fois qu'une valeur sera modifié le callback sera executé
getBooks(){
  firebase.database().ref('/books')
  .on('value', 
  // ici c'est le callback
  (data)=>{
    this.books = data.val() ? data.val() : [];
    this.emitBooks();
  });
}

// take one Book from db with id
getSingleBook(id: number){
  return new Promise(
    (resolve,reject)=>{
      firebase.database().ref('/books/'+ id).once('value').then(
        (data)=>{
          resolve(data.val());
        }, (error) =>{
          reject(error);
          
        }
      );
    }
  );
}

// create a new book and add in db
createNewBook(newBook: Book){
  this.books.push(newBook);
  this.saveBooks();
  this.emitBooks();
}

// remove a book from db
removeBook(book: Book){
  // si le livre est supprimé, la photo doit egalement etre supprimé
  if(book.photo){
    const storageRef = firebase.storage().refFromURL(book.photo);
    storageRef.delete().then(
           () => {
             console.log('Photo supprimée');
    
                   }
            ).catch(
              (error) => {
                console.log('Fichier non trouvé : ' + error);
              }
            );
  }
  const bookIndexToRemove = this.books.findIndex(
    (bookEl) =>{
      if(bookEl === book){
        return true;
      }
    }
  );
  // ici je supprime de l'array local et j'appel saveBooks() pour enregistrer les livres restant 
  this.books.splice(bookIndexToRemove, 1);
  this.saveBooks();
  this.emitBooks();
  }

  // upload File
  uploadFile(file: File){
    // Create the file metadata
var metadata = {
  contentType: 'image/jpeg'
};
    return new Promise(
      (resolve, reject) => {
        //const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage()
                               .ref()
                               //.child('images/' + almostUniqueFileName + file.name)
                               .child('images/' + file.name)
                               .put(file, metadata);
              upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
                                   function(snapshot) {
                                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                    console.log('Chargement...' + progress + '% done');
                                    switch (snapshot.state) {
                                      case firebase.storage.TaskState.PAUSED: // or 'paused'
                                        console.log('Upload is paused');
                                        break;
                                      case firebase.storage.TaskState.RUNNING: // or 'running'
                                        console.log('Upload is running');
                                        break;
                                    }
                                  },
                                  function(error) {
                                    console.log('Erreur de Chargement :' + error);
                                    reject();
                                 },

                                 function() {
                                      resolve(upload.snapshot.ref.getDownloadURL());
                                  }
                                  
                        );
                    }
                );
            }
}
