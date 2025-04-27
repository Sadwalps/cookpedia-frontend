import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  testimonyForm: FormGroup

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.testimonyForm = this.fb.group({
      name: ["", [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      email: ["", [Validators.required, Validators.email]],
      message: ["", [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
    })
  }
  addTestimony() {
    if (this.testimonyForm.valid) {
      const name = this.testimonyForm.value.name
      const email = this.testimonyForm.value.email
      const message = this.testimonyForm.value.message

      this.api.addTestimonyAPI({ name, email, message }).subscribe((res: any) => {
        alert(`Thanks for Your Testimony`)
        this.testimonyForm.reset()
      })
    } else {
      alert(`Invalid Form`)
    }

  }

}
