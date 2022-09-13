import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup

  hide: boolean = true
  submitted: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('todo@gmail.com', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('123456', [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

  submit() {
    if (this.loginForm.invalid) {
      return
    }

    this.submitted = true

    const user: User = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    this.auth.login(user).subscribe(() => {
      this.loginForm.reset()
      this.router.navigate(['/home'])
      this.submitted = false
    }, () => {
      this.submitted = false
    })
  }

}
