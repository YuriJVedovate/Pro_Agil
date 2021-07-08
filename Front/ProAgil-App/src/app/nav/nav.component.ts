import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit() {}

  loggedIn() {
    return this.authService.loggedIn();
  }

  entrar(){
    this.router.navigate(['/user/login']);
  }

  logout() {
    localStorage.removeItem('token');
    this.toastr.show('Log Out');
    this.router.navigate(['/user/login']);
  }
}
