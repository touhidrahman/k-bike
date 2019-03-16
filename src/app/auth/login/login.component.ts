import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading = false;
  private isLoggedInSubject: Subscription;

  constructor(private auth: AuthService, public router: Router) { }

  ngOnInit() {
    this.isLoggedInSubject = this.auth.getIsLoggedInStatusListener().subscribe(_ => {
      this.isLoading = false;
    });
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.auth.login(form.value.username);
  }

  ngOnDestroy(): void {
    this.isLoggedInSubject.unsubscribe();
  }

}
