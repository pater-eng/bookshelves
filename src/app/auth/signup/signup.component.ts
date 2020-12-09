import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
// ici on va creer un utilisateur
signUpForm: FormGroup;
errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    //Inialisation du formular
    this.initForm();
  }

  initForm(){
    this.signUpForm = this.formBuilder.group(
      {
        'email': ['', [Validators.required, Validators.email]],
        'password': ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]{6,}')]]
      }
    );
  }

  onSubmit(){
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    // on creer un utilisateur 
    this.authService.createNewUser(email,password).then(
      () =>{
        this.router.navigate(['/books']);
      },
      (error) =>{
        // si l'email existe deja ou si le mot de passe n'est pas exacte, alors il sera renvoyé cette erreur
        this.errorMessage = error;
      }

    );
  }

}
