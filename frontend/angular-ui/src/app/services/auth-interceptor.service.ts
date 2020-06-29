import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector, private router: Router, private toastr: ToastrService) {}
  
  intercept(request, next) {
    var authService = this.injector.get(AuthService);
    
    if(authService.isAuthenticated){
      var authRequest = request.clone({
        headers: request.headers.set('authorization', 'token ' + authService.token)
      })
  
      return next.handle(authRequest).pipe(
        catchError((err)=>{
          if(err.status === 401){
            this.toastr.error("Unauthorized User...")
            this.router.navigateByUrl("/login")
          }
          
          return "error"
        })
      );
    }
    else{
      return next.handle(request).pipe(
        catchError((err)=>{
          if(err.status === 401){
            this.toastr.error("Unauthorized User...")
            this.router.navigateByUrl("/login")
          }
          
          return "error"
        })
      )
    }
  }

}
