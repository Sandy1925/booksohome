import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './favorites/favorites.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';
import { BooksoComponent } from './bookso/bookso.component';

const routes: Routes = [
  {path:"",component:BooksoComponent,pathMatch:'prefix'},
  {path:"home/:email",component:BooksoComponent,pathMatch:'prefix'},
  {path:"favorites/:email",component:FavoritesComponent,pathMatch:'prefix'},
  {path:"cart/:email",component:CartComponent,pathMatch:'prefix'},
  {path:"orders/:email",component:OrdersComponent,pathMatch:'prefix'},
  {path:"profile/:email",component:ProfileComponent,pathMatch:'prefix'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
