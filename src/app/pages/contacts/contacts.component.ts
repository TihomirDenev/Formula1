import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contacts',
  imports: [TranslateModule, ReactiveFormsModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createContactForm();
  }

  createContactForm(): void {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      alert(
        `Thank you, ${this.contactForm.value.firstName}! Your form has been submitted.`
      );
      this.contactForm.reset();
    }
  }
}
