import { HttpClient } from '@angular/common/http';
import { Component, Input, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Book, CartIn, Customer, Favorites, Order } from 'models';

@Component({
  selector: 'app-bookso',
  templateUrl: './bookso.component.html',
  styleUrls: ['./bookso.component.css']
})
export class BooksoComponent {

  email!:string;
  customer!:Customer;
  books!:Book[];
  searching!: string;
  favResult:Favorites=new Favorites();
  favorites!:Favorites[];
  favoriteBooks!:Book[];
  
 
 
  constructor(public dialog:MatDialog,private activatedRoute:ActivatedRoute,
    private http:HttpClient,public cart:CartIn){
      this.cart.quantity=1;
    
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
    //Getting the customer details with the cookied email
   this.http.get<Customer>("http://localhost:8001/api/getByEmail/"+this.email).subscribe(data=>{
    this.customer=data;
    console.log(this.customer.code);
   },error=>{
    console.log(error.error);
    alert(error.error.message);
   })
    console.log(this.email);

    //getting the books from the database
    this.http.get<Book[]>("http://localhost:8003/api/getAll").subscribe(data=>{
      this.books=data;
      console.log(this.books);
    },error=>{
      console.log(error.error);
      alert(error.error.message);
    })
    var docs=document.getElementsByClassName("mat-typography");
    console.log(docs);
   

  }

  addToCart(bookCode:string,tempRef:TemplateRef<any>,errRef:TemplateRef<any>){
  
    this.cart.bookCode=bookCode;
    this.cart.customerCode=this.customer.code;
    this.cart.quantity;
    this.http.post<CartIn>("http://localhost:8002/api/newCart",this.cart).subscribe(data=>{
      console.log(bookCode);
      this.dialog.open(tempRef);
      var inputqty=document.getElementById(bookCode)as HTMLInputElement;
      inputqty.value="1";
    },error=>{
      this.dialog.open(errRef);
    })
    
    
  }

  placeOrder(bookCode:string,tempRef:TemplateRef<any>,errRef:TemplateRef<any>){
    this.cart.bookCode=bookCode;
    this.cart.customerCode=this.customer.code;
    this.cart.quantity;
    this.http.post<Order>("http://localhost:8002/api/newOrderByOrd",this.cart).subscribe(data=>{
      console.log(data);
      this.dialog.open(tempRef);
      var inputqty=document.getElementById(bookCode)as HTMLInputElement;
      inputqty.value="1";
    },error=>{
        this.dialog.open(errRef);
    })
    
  }

  likeBook(code:string,temRef:TemplateRef<any>){
    console.log(code);
    this.favResult.bookCode=code;
    this.favResult.customerCode=this.customer.code;
    this.http.post<Favorites[]>("http://localhost:8003/api/addFavorite",this.favResult).subscribe(data=>{
        console.log(data);
    })
    this.dialog.open(temRef);

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
