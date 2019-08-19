import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contactsForm: FormGroup = this.fb.group({
    name: [''],
    email: [''],
    phoneNumber: [''],
    message: [''],
  });

  constructor(
    private fb: FormBuilder) { }

  ngOnInit() {
  }

}
