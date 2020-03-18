import { Injectable } from '@angular/core';
import { Contact } from '../modeles/interfaces.type';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  // constructor(private firestore: AngularFirestore, private http: HttpClient) { } Firestore
  constructor(private firestore: AngularFirestore, private http: HttpClient) { }

  /* getUsers() {
   return this.http.get(environment.serverConfig.serverURL + `?method=getContacts`);
  } */

  createContact(firstName, mail) {
    const body = {
      "firstName" : firstName,
      "mail": mail
    };
    const url = environment.serverConfig.serverURL + '?method=createContact';
    return this.http.post<any>(url, body, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
  //*Firestore
/*   getAllMails() {
    return this.firestore.collection('mails').snapshotChanges();
  }

  saveMailInDB(mail: Contact){
    return this.firestore.collection('mails').add(mail);
  }

  updateMail(mail: Contact){
    delete mail.id;
    this.firestore.doc('mails/' + mail.id).update(mail);
  }

  deleteMail(mailId: string){
    this.firestore.doc('mails/' + mailId).delete();
  } */
}
