import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators, UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Page } from '../modeles/interfaces.type';
import { HeaderService } from '../shared/services/header.service';
import { ContactService } from '../shared/services/http/contact.service';
import { TextFieldModule } from '@angular/cdk/text-field';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, NgIf, TextFieldModule, MatButtonModule, MatProgressBarModule, MatSnackBarModule]
})
export class ContactComponent implements OnInit, Page {

  title = "Contact - Adresse mail - Sommeil Profond";
  metaDesc = "Contact Sommeil Profond - Comment me contacter ? Adresse mail pour me contacter.";

  emailFormControl = new UntypedFormControl('', [Validators.required, Validators.email]);

  reactiveForm = new UntypedFormGroup({
    firstName: new UntypedFormControl('', [Validators.required]),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    message: new UntypedFormControl('', [Validators.required, Validators.minLength(15)])
  })

  get firstName() { return this.reactiveForm.get('firstName'); }
  get email() { return this.reactiveForm.get('email'); }
  get message() { return this.reactiveForm.get('message'); }

  failSend:boolean = false;
  isSend:boolean = false;
  isLoading: boolean = false;


  constructor(
    public headerService: HeaderService,
    private contactService: ContactService,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    this.headerService.handleTitleAndMeta(this.title, this.metaDesc);
  }

  onSubmit() {
    if (!this.reactiveForm.valid) {
      console.log('Pas valide');
      return;
    }
    this.isLoading = true;
    const values = this.reactiveForm.value;
    this.contactService.sendMessage(values.firstName, values.email, values.message).subscribe(result => {

      this.isLoading = false;

      if (result.error || !result.isSend) {
        this.failSend = true;
        return;
      }
      this.isSend = true;
      this.reactiveForm.reset();

    });
  }

  onOpenLinkedin() {
    window.open('https://www.linkedin.com/in/romain-geffrault-99540015a', '_blank');
  }

  copyToClipBoard() {
    const temp = document.createElement("input");
    const text = "romain@sommeilprofond.fr";
    temp.setAttribute("value", text);
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);

    this._snackBar.open("Copié !", null, { duration: 3000} );
  }
}
