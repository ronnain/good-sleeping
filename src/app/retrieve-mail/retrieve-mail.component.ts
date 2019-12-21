import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-retrieve-mail',
  templateUrl: './retrieve-mail.component.html',
  styleUrls: ['./retrieve-mail.component.css']
})
export class RetrieveMailComponent implements OnInit {

  public emails: Observable<any[]>;
  constructor(db: AngularFireDatabase) {
      this.emails = db.collection('/emails').valueChanges();
  }

  ngOnInit() {
  }

  public addEmail(): void {
    let newEmail:string = "romain.geffrault@laposte.net";
    this.emails.push(newEmail);
    this.emails.re
  }

}
