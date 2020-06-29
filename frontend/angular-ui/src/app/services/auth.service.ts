import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RegisterUser } from '../models/registerUser';
import { LoginUser } from '../models/loginUser';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  TOKEN_KEY = 'token';

  register(registerUser: RegisterUser) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.httpClient
      .post(environment.path + '/user/register', registerUser, {
        headers: headers,
      })
      .subscribe((data) => {
        console.log(data);
        this.toastr.success('Welcome New User...');
        this.router.navigateByUrl('/login');
      });
  }

  login(loginUser: LoginUser) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.httpClient
      .post(environment.path + '/user/login', loginUser, {
        headers: headers,
      })
      .subscribe((data) => {
        this.saveToken(data['token']);
        this.toastr.success('Welcome User...');
        this.router.navigateByUrl('/author');
      });
  }

  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
