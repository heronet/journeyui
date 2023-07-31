import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { AuthDto } from './auth/authdto';
import { ThemeService } from './theme/theme.service';
import { ConnectionService } from './connection/connection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  darkMode = false;
  private chatsSub = new Subscription();
  private themeSub = new Subscription();
  constructor(
    private authService: AuthService,
    private connectionService: ConnectionService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.themeSub = this.themeService.theme$.subscribe({
      next: () => this.toggleTheme(),
    });
    this.chatsSub = this.connectionService.signalRError$.subscribe({
      next: (err) => {
        if (err.message.includes('401')) this.authService.logout();
      },
    });
    this.plantAuthData();
    this.setTheme();
  }

  plantAuthData() {
    let email = localStorage.getItem('email');
    let id = localStorage.getItem('id');
    let token = localStorage.getItem('token');
    let roles = localStorage.getItem('roles');
    let rolesOg: string[] = [];

    if (roles && roles !== 'undefined') rolesOg = JSON.parse(roles);

    if (email && id && token) {
      let authDto: AuthDto = { email, id, roles: rolesOg, token };
      this.authService.setData(authDto);
    } else {
      this.authService.setData(undefined);
    }
  }
  setTheme() {
    let theme = localStorage.getItem('theme');
    if (!theme) {
      theme = 'light';
      localStorage.setItem('theme', theme);
    }
    if (theme === 'dark') this.darkMode = true;
  }
  toggleTheme() {
    if (this.darkMode) {
      localStorage.setItem('theme', 'light');
      this.darkMode = false;
    } else {
      localStorage.setItem('theme', 'dark');
      this.darkMode = true;
    }
  }
  ngOnDestroy(): void {
    this.themeSub.unsubscribe();
    this.chatsSub.unsubscribe();
  }
}
