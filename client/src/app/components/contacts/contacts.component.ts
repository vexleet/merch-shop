import { ToastrService } from 'ngx-toastr';
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
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  sendMail() {
    this.contactService.sendMail(this.contactsForm.value)
      .subscribe((res) => {
        if (res['success']) {
          this.toastr.success(res['message']);
          this.router.navigate(['/']);
        }
        else {
          this.toastr.error(res['messsage']);
        }
      });
  }
}
