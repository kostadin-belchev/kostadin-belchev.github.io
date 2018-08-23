import { Component, OnInit } from '@angular/core';
import { RegisterFormModel } from '../models/register-form.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  model: RegisterFormModel
  registerFailed: boolean = false
  errorDescription: string

  constructor( private authService: AuthService ) {
    this.model = new RegisterFormModel('', '', '')
  }

  ngOnInit() {
  }

  register() {
    const email = this.model.email
    const password = this.model.password
    const username = this.model.username
    // console.log([email, password])
    this.authService.signUp(email, password, username)// .then(data => console.log(data)).catch(err => console.error(err))
  }

}
