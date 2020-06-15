import { ContactService } from 'src/app/services/contact.service';
import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'add-contacts',
  templateUrl: './add-contacts.component.html',
  styleUrls: ['./add-contacts.component.css']
})
export class AddContactsComponent implements OnInit {

  statusContact:boolean=true;
  contact:Contact={
    name:'',
    telephone:null
  }
  constructor(private contactService: ContactService) {

   }
  
  ngOnInit(): void {
  }
  newContact(){
    this.contactService.creatContact(this.contact);
    this.contact={
      name:'',
      telephone:null
    }
    this.statusContact=true;
  }
}
