import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AuthDto } from '../auth/authdto';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  authData: AuthDto | undefined = undefined;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.authData$.subscribe({
      next: (data) => (this.authData = data),
    });
  }
  logout() {
    this.authService.logout();
  }
}
