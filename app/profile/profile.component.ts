import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Customer } from 'models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  email!:string;
  customer!:Customer;
  constructor(private http:HttpClient){
    var cookies=document.cookie.split(';');
    for(let i=0;i<cookies.length;i++){
      console.log(cookies[i]);
      var data=cookies[i].split("=");
      console.log(data);
      if( data[0]=="bookso" || data[0]==" bookso"){
          this.email=data[1];
          console.log(this.email);
          break;
      }
    }
    this.http.get<Customer>("http://localhost:8001/api/getByEmail/"+this.email).subscribe(data=>{
    this.customer=data;
    console.log(this.customer.code);
   },error=>{
    console.log(error.error);
    alert(error.error.message);
   })
  }
}
