import { Component, OnInit } from '@angular/core';
import { LoginUser } from 'src/app/models/loginUser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  loginUser:any = {}

  login(loginUser: LoginUser) {
    this.authService.login(loginUser);
  }

}
