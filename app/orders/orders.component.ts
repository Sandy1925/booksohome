import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Book, Customer, Order } from 'models';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  email!:string;
  customer!:Customer;
  myOrders!: Order[];
  books:Book[]=new Array();
  orderBook:{[bookCode:string]:string}={

  }
 result!:Book;
  constructor(private http:HttpClient, public bookResult:Book){
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
    this.http.get<Order[]>("http://localhost:8002/api/getOrdByCusCode/"+this.customer.code).subscribe(data=>{
      this.myOrders=data;
      console.log(this.myOrders);
      this.getBooks();
    })
   },error=>{
    console.log(error.error);
    alert(error.error.message);
   })
  }
  getBooks(){
    for(var c of this.myOrders){
        this.http.get<Book>("http://localhost:8003/api/getByCode/"+c.bookCode).subscribe(data=>{
          this.books.push(data);
           this.bookResult=data;
           console.log(this.bookResult);
           this.orderBook[c.bookCode]=this.bookResult.title;
        })
        
        console.log(this.orderBook);
         
    }
    this.books=this.books.reverse();

    console.log("Books");
    console.log(this.books);
   
    console.log("orderBook");

    console.log(this.orderBook['B0004']);
  }
}
