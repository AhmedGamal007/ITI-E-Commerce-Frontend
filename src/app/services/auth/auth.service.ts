import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ErrorHandler } from 'src/app/shared/error-handler';
import { Observable } from 'rxjs';
import { ResponseViewModel } from 'src/app/models/responseviewmodel';
import { Customer } from 'src/app/models/customer';
import { User } from 'src/app/models/user';
import { Admin } from 'src/app/models/admin';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
   currentUserCustomer = new Customer();
   currentUserAdmin = new Admin();

  constructor(private http: HttpClient,private router: Router) { }
  private errorHandler:ErrorHandler=new ErrorHandler();

 private _registerUrl= `http://localhost:9090/ecommerce/auth/register`;
 private _loginUrl= `http://localhost:9090/ecommerce/auth/login`;
 private _adminRegisterUrl=`http://localhost:9090/ecommerce/auth/admin/register`;
 private _userUrl = 'http://localhost:9090/ecommerce/customer/'
 private _usersURL='http://localhost:9090/ecommerce/customer/all';
  


    register(data:any): Observable<any>{
      try {
       return this.http.post<any>(this._registerUrl,data);   
      } catch (error) {
         console.log(this.errorHandler.handleError(error));
         return null;
      }
    }
     login(data:any): Observable<any>{
      try {
         return this.http.post<any>(this._loginUrl,data) 
      } catch (error) {
         console.log('aS23');
         this.errorHandler.handleError(error);
         return null;
      }
     }
     adminRegister(data:any): Observable<any>{

        try {
         return this.http.post<any>(this._adminRegisterUrl,data);

        } catch (error) {
         console.log('aS30');
         this.errorHandler.handleError(error);
         return null;
        }
     
     }

     userLogout(){
      this.currentUserAdmin=null;
      this.currentUserCustomer=null;
      localStorage.removeItem("role");
      localStorage.removeItem("token");
      this.router.navigate(['/home']);
     };
   //   isUser():boolean{
   //    if(this.isCustomer()&&this.isAdmin()) return true;
   //    return false;
   //   }
     isCustomer():boolean{
      if (localStorage.getItem('role')=='CUSTOMER') {
         return true;
      }
      return false;
   }
     getUsername(){
      return this.getCurrentUser().username;
     }
     isAdmin():boolean{
      if (localStorage.getItem('role')=='ADMIN') {
         return true;
      }
      return false;
     }
     getCurrentUserId(){
      return this.getCurrentUser().id
     }
     getCurrentUser(){
      if (localStorage.getItem('role')=="CUSTOMER") {
         return this.currentUserCustomer;
      }else if(localStorage.getItem('role')=="ADMIN"){
         return this.currentUserAdmin;
      }else{
         return null;
      }
     }
     getToken(){
      return localStorage.getItem("token");
     }
     isLoggedIn(): boolean{
      return !!localStorage.getItem("token");
     }
     getSystemCustomers(): Observable<Customer[]>{
      try {
         return this.http.get<any>(this._usersURL);
      } catch (error) {
         console.log("aS31");
         this.errorHandler.handleError(error);
         return null;
      }
     }

  }