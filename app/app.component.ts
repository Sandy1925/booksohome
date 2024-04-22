import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bookso';
  email!:string;

  constructor(private http:HttpClient){
    var cookies=document.cookie.split(";");
    console.log(cookies);
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
    
  }
}
