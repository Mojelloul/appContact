import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from '../models/contact';
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactDoc:AngularFirestoreDocument<Contact>;
  contactsCollection : AngularFirestoreCollection<Contact>;
  contacts: Observable<Contact[]>;

  constructor(private afs: AngularFirestore) { 
    this.contactsCollection=this.afs.collection('contacts');
    this.contacts =this.contactsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Contact;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  getContacts(){
    return this.contacts;
  }
  creatContact(contact: Contact){
    this.contactsCollection.add(contact);
  }
  updateContact(contact:Contact){
    this.contactDoc=this.contactsCollection.doc<Contact>(contact.id);
    this.contactDoc.update(contact);
  }
  deleteContact(contact:Contact){
    this.contactDoc=this.contactsCollection.doc<Contact>(contact.id);
    this.contactDoc.delete();
  }
}
 