import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ResponseViewModel } from './models/responseviewmodel';
import { CartService } from './services/cart/cart.service';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecommerce';

  constructor(private cartServices: CartService,private authService:AuthService,private router:Router){}
 

 countCart():number{
  // console.log(this.cartServices.countProductCart());
  return this.cartServices.countProductCart();
 }

 logout(){
  console.log(this.authService.isLoggedIn());
  this.authService.userLogout();
  console.log(this.authService.isLoggedIn());
  this.router.navigate(['/home'])
 }

}
