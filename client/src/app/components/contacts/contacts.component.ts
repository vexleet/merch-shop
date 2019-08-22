import { ContactService } from './../../core/services/contact.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contactsForm: FormGroup = this.fb.group({
    email: [''],
    subject: [''],
    message: [''],
  });

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router) { }

  ngOnInit() {
  }

  sendMail() {
    this.contactService.sendMail(this.contactsForm.value)
      .subscribe((res) => {
        console.log(res);
        this.router.navigate(['/']);
      });
  }
}
