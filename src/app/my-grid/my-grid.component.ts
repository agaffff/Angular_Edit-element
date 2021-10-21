import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Contact } from '../shared/contact';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../shared/contact.service';


@Component({
  selector: 'app-my-grid',
  templateUrl: './my-grid.component.html',
  styleUrls: ['./my-grid.component.css'],
  providers: [ContactService]
})
export class MyGridComponent implements OnInit {
  @ViewChild('displayTmpl') displayTmpl!: TemplateRef<any>;
  @ViewChild('editTmpl') editTmpl!: TemplateRef<any>;

  //contacts!: Contact[];
  selected!: Contact;

  contacts: Contact[] = [{
    id:1,
    name:"Contact 1",
    age:28
},{
    id:2,
    name:"Contact 2",
    age:24 
},{
    id:3,
    name:"Contact 3",
    age:28 
},{
    id:4,
    name:"Contact 4",
    age:26 
}];
  
  constructor(private service: ContactService) { }
  ngOnInit(): void {
     this.service.getAll().subscribe(
       (result)=> {
         this.contacts = result;
         
       },
       (error)=>console.error(error)
       )
      
  }

  getTemplate(contact: Contact){
    return this.selected && this.selected.id == contact.id ? this.editTmpl : this.displayTmpl;
  }

  editContact(contact: Contact){
    this.selected = Object.assign({},contact);
  }

  saveContact(){
    this.service.update(this.selected);
    this.reset();
  }

  reset(){
    this.selected =new  Contact(0, "", 0);
  }

}
