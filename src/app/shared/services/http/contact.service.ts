import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class ContactService {

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };

    constructor(private http: HttpClient) { }

    sendMessage(firstName: string, email: string, message: string) {
        const body = {
            firstName,
            email,
            message
        };
        const url = environment.serverConfig.serverURL + '?method=sendMessage';
        return this.http.post<any>(url, body, this.httpOptions);
    }
}