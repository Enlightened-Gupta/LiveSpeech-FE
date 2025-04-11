import { Component, HostListener } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AlertComponent } from './pages/alert/alert.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, MatToolbarModule, NgxSpinnerModule, RouterModule, MatIconModule,AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent {
  menuOpen = false;
  isMobile = false;
  title = 'Ace AI Academy';
  isLoggedin: boolean = false;
  alertMessage: string | null = null;
  alertType: 'success' | 'danger' | 'info' | 'warning' = 'info';

  showAlert(msg: string, type: 'success' | 'danger' | 'info' | 'warning' = 'info') {
    this.alertMessage = msg;
    this.alertType = type;

    // Optional: Auto-hide after 5 seconds
    setTimeout(() => {
      this.alertMessage = null;
    }, 5000);
  }
  // showTrialStrip: boolean = false;
  // trialDaysLeft: number = 0;
  constructor(private router: Router, public authService: AuthService,private spinner: NgxSpinnerService) {
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
    // if (this.isLoggedin) {
    //   this.spinner.show();
    //   this.authService.isSubscriptionAvailable().subscribe({
    //     next: (response) => {
    //       debugger;
    //       this.spinner.hide();
    //       //alert(response.message);
    //       this.trialDaysLeft=response.daysRemaining;
    //       if (this.trialDaysLeft > 0) {
    //         this.showTrialStrip = true;
    //       }
    //     },
    //     error: (err) => {
    //       debugger;
    //       this.spinner.hide();
    //       alert(err.error.text);
    //     }
    //   });
    // }
  }
  liveSpeech() {
    this.router.navigateByUrl("/live", { replaceUrl: true });
  }
  register() {
    this.router.navigateByUrl("/register", { replaceUrl: true });
  }
  LogOut() {
    this.authService.logout();
    this.isLoggedin = this.authService.isAuthenticated();
    this.router.navigateByUrl("/login", { replaceUrl: true });
  }
  // OpenLiveSpeech()
  // {
  //   this.router.navigateByUrl("/live", {replaceUrl: true});
  // }

}
