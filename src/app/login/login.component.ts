import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern("[a-zA-Z0-9]*")]]
    })

  }
  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email
      const password = this.loginForm.value.password
      // alert(`${email}, ${password}`)
      this.api.loginApi({ email, password }).subscribe({
        next: (res: any) => {
          alert(`Welcome To Cookpedia`)
          sessionStorage.setItem("user", JSON.stringify(res.user))
          sessionStorage.setItem("token", res.token)
          this.api.getchartData()
          if (res.user.role == "user") {
            this.router.navigateByUrl("/")
          }else{
            this.router.navigateByUrl("/admin")
          }
        },
        error: (reason: any) => {
          alert(`Something Went Wrong`)
        }
      })

    } else {
      alert(`Invalid Form`)
    }

  }

}
