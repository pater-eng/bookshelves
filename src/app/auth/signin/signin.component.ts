import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;
  errorMessage: string;
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

ngOnInit(): void {
//Inialisation du formular
this.initForm();
}

initForm(){
this.signInForm = this.formBuilder.group(
{
'email': ['', [Validators.required, Validators.email]],
'password': ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]{6,}')]]
}
);
}

onSubmit(){
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;
    // on creer un utilisateur 
    this.authService.signInUser(email,password).then(
          () =>{
          this.router.navigate(['/books']);
          },
          (error) =>{
          // si l'email existe deja alors il sera renvoyé cette erreur
          this.errorMessage = error;
          }

    );
  }

}
