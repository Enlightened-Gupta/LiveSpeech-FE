import { Component,HostListener  } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxSpinnerModule } from "ngx-spinner";
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,MatToolbarModule,NgxSpinnerModule,RouterModule,MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent {
  menuOpen = false;
  isMobile = false;
  title = 'Live-Speech';
  isLoggedin: boolean = false;
  constructor(private router: Router, public authService: AuthService) {
    this.checkScreenSize();
  }
  @HostListener('window:resize', ['$event'])
  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
  ngOnInit() {
    this.isLoggedin = this.authService.isAuthenticated();
  }
  liveSpeech()
  {
    this.router.navigateByUrl("/live", {replaceUrl: true});
  }
  register()
  {
    this.router.navigateByUrl("/register", {replaceUrl: true});
  }
  LogOut()
  {
    this.authService.logout();
    this.isLoggedin = this.authService.isAuthenticated();
    this.router.navigateByUrl("/login", {replaceUrl: true});
  }
  // OpenLiveSpeech()
  // {
  //   this.router.navigateByUrl("/live", {replaceUrl: true});
  // }

}
