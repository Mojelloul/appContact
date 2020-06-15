import { Contact } from './../../models/contact';
import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.css']
})
export class ListContactsComponent implements OnInit {
  contacts;
  myContact:Contact;
  afficher:boolean=false;
  constructor(private contactService:ContactService) { }

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(contacts=>{
      this.contacts=contacts;
      console.log(this.contacts);
    })
  }
  updateContact(contact){
    this.contactService.updateContact(contact);
    this.afficher= false;
  }
  modifierClient(contact){
    this.myContact=contact;
    this.afficher= !this.afficher;
  }
  deleteContact(contact){
    if(confirm('are you sure to delete this contact'))
      this.contactService.deleteContact(contact);
    else
    this.afficher= false;
  }
}
