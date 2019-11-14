import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'contactForm',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ContactService]
})
export class ContactComponent implements OnInit {
  display: boolean = false;
  sendName: string = '';
  sendReference: number = 0;
  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  createFormGroup() {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      message: new FormControl('', [Validators.required, Validators.maxLength(250)])
    });
  }

  contactForm: FormGroup;

  constructor(
    private _contactService: ContactService
  ) {
    this.contactForm = this.createFormGroup();
  }

  ngOnInit() {
  }

  onResetForm() {
    this.contactForm.reset();
  }

  onSaveForm() {
    if (this.contactForm.valid) {

      // this.dbData.saveMessage(this.contactForm.value);
      this._contactService.saveContact(this.contactForm.value).subscribe(
        response => {
          this.sendReference = response.reference;
          console.log('Receive Reference' , this.sendReference);
        },
        error => {
          console.log(<any>error);
        }
      );
      this.showDialog();

      this.onResetForm();
      console.log('Valid');
    } else {
      console.log('Not Valid');
    }
  }
  get name() {
    return this.contactForm.get('name');
  }
  get phone() {
    return this.contactForm.get('phone');
  }
  get email() {
    return this.contactForm.get('email');
  }
  get message() {
    return this.contactForm.get('message');
  }

  showDialog() {
    this.display = true;
  }

  hideDialog() {
    this.display = false;
  }

}
