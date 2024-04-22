import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from  '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormGroup,FormsModule } from '@angular/forms';
import { FavoritesComponent } from './favorites/favorites.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgOptimizedImage } from '@angular/common';
import { BooksoComponent } from './bookso/bookso.component';
import {MatDialog,MatDialogContent,MatDialogModule}  from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Book, CartIn, Order } from 'models';

@NgModule({
  declarations: [
    AppComponent,
    FavoritesComponent,
    CartComponent,
    OrdersComponent,
    ProfileComponent,
    BooksoComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgOptimizedImage,
    BrowserAnimationsModule,
    MatDialogModule,
    
  
   
  ],
  providers: [CartIn,Order,Book],
  bootstrap: [AppComponent]
})
export class AppModule { }

