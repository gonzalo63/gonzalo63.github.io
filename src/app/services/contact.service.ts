import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Contact } from '../models/contact';
import { Global } from './global';

@Injectable()
export class ContactService {
    public url: string;

    constructor (
        public _http: HttpClient
    ) {
        this.url = Global.url;
    }

    testService() {
        return 'Probando Servicio de Angular';
    }

    saveContact(contact: Contact): Observable<any> {
        let params = JSON.stringify(contact);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'contact/add', params, {headers: headers});
    }
}