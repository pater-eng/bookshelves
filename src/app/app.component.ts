import { Component } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(){
    const firebaseConfig = {
      apiKey: "AIzaSyAX5CTObXRcioMsGzMfYyfK_ishqOtPFfI",
      authDomain: "angular-example-f0816.firebaseapp.com",
      databaseURL: "https://angular-example-f0816.firebaseio.com",
      projectId: "angular-example-f0816",
      storageBucket: "angular-example-f0816.appspot.com",
      messagingSenderId: "626628926630",
      appId: "1:626628926630:web:846d505594b085efd62867",
      measurementId: "G-80R32MHPZ9"
    };
    firebase.initializeApp(firebaseConfig);
  }
}
