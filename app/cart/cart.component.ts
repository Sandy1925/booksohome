import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Book, CartIn, CartOut, Customer, Order } from 'models';
import { interval, timeout } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  email!:string;
  customer!:Customer;
  carts!:CartIn [];
  books:Book[]=new Array();

  

 resultBook:{[code:string]:number}={

 };
 
  
  constructor(public dialog:MatDialog,private http:HttpClient,public myOrd:CartIn,public cart:CartIn){
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
    this.http.get<CartIn[]>("http://localhost:8002/api/getByCusCode/"+this.customer.code).subscribe(data=>{
        this.carts=data;
        console.log(this.carts);
        //this.getBooks();
        this.getResultBook();
  
    })

   },error=>{
    console.log(error.error);
    alert(error.error.message);
   })
  }


getResultBook(){
  for(var i=0;i<=this.carts.length;i++){
    this.http.get<Book>("http://localhost:8003/api/getByCode/"+this.carts[i].bookCode).subscribe(data=>{
     this.books.push(data);
     this.resultBook[data.code]=this.carts[i].quantity;
  })
  this.books=this.books.reverse();
  console.log(this.books);
  console.log("resultBook");
  console.log(this.resultBook);
  
 
  }
  
}


placeOrder(bookCode:string,tempRef:TemplateRef<any>,errRef:TemplateRef<any>){
  console.log(bookCode);
  this.myOrd.customerCode=this.customer.code;
  this.myOrd.bookCode=bookCode;
  this.myOrd.quantity=this.cart.quantity
  this.http.post<Order>("http://localhost:8002/api/newOrderByOrd",this.myOrd).subscribe(data=>{
    console.log(data);
    this.dialog.open(tempRef);
    
    location.reload();
  })
}

decreaseQty(code:string,errRef:TemplateRef<any>){
  var inputqty=document.getElementById(code)as HTMLInputElement;
  if (parseInt(inputqty.value)<=1){
      this.dialog.open(errRef)
  }
  else{
  inputqty.value=(parseInt(inputqty.value)-1).toString();
  this.cart.bookCode=code;
  this.cart.customerCode=this.customer.code;
  this.cart.quantity=parseInt(inputqty.value);
  console.log(this.cart);
  }
}

increaseQty(code:string){
  var inputqty=document.getElementById(code)as HTMLInputElement;
  inputqty.value=(parseInt(inputqty.value)+1).toString();
  this.cart.bookCode=code;
  this.cart.customerCode=this.customer.code;
  this.cart.quantity=parseInt(inputqty.value);
  console.log(this.cart);
}
}
