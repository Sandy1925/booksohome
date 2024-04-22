import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Book, CartIn, Customer, Favorites, Order } from 'models';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {


  email!:string;
  customer:Customer=new Customer();
  books:Book[]=[];
  cart:CartIn=new CartIn();
  favList:Favorites[]=[];
  constructor(public dialog:MatDialog,private http:HttpClient,public myOrd:CartIn){
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
    this.http.get<Favorites[]>("http://localhost:8003/api/getMyFavs/"+this.customer.code).subscribe(data=>{
    this.favList=data;
    console.log(this.favList);
    this.getBooks();
   })
   
   
    
   },error=>{
    console.log(error.error);
    alert(error.error.message);
   })
   
  }

  getBooks(){
    console.log("Get Books");
    for(var i=0;i<=this.favList.length;i++){
      this.http.get<Book>("http://localhost:8003/api/getByCode/"+this.favList[i].bookCode).subscribe(data=>{
        this.books.push(data);
      })
    }
    
    this.books=this.books.reverse();
    console.log(this.books);
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
}
