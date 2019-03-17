import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  success = false;

  constructor(private auth: AuthService, public router: Router) { }

  signup(form: NgForm) {
    this.auth.createUser(form.value.username).subscribe(value => {
      this.success = true;
    });
  }

}
