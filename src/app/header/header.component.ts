import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AuthDto } from '../auth/authdto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  authData: AuthDto | undefined = undefined;
  authSub: Subscription = new Subscription();
  isAdmin = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSub = this.authService.authData$.subscribe({
      next: (data) => {
        this.authData = data;
        if (
          this.authData?.roles?.some(
            (x) => x == 'SuperAdmin' || x == 'Admin' || x == 'Moderator'
          )
        )
          this.isAdmin = true;
        else this.isAdmin = false;
      },
    });
  }
  logout() {
    this.authService.logout();
  }
  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
