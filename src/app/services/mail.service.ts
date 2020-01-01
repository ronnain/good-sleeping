import { Injectable } from '@angular/core';
import { Mail } from '../modeles/interfaces.type';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private firestore: AngularFirestore) { }

  getAllMails() {
    return this.firestore.collection('mails').snapshotChanges();
  }

  saveMailInDB(mail: Mail){
    return this.firestore.collection('mails').add(mail);
  }

  updateMail(mail: Mail){
    delete mail.id;
    this.firestore.doc('mails/' + mail.id).update(mail);
  }

  deleteMail(mailId: string){
    this.firestore.doc('mails/' + mailId).delete();
  }
}
