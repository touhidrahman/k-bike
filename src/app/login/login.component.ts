import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string;

  constructor(private api: ApiService, public router: Router) {
    console.log('login comp loaded :', ); // ! remove
  }

  simulateLogin() {
    this.api.login(this.username).subscribe(res => {
      if (!res.error) {
        this.router.navigate(['/']);
      }
    });
  }

}
