import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterUser } from 'src/app/models/registerUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  registerUser:any = {}

  register(registerUser: RegisterUser) {
    this.authService.register(registerUser);
  }
}
