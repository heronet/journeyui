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
  canAddHotel = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.authData$.subscribe({
      next: (data) => {
        this.authData = data;
        if (
          this.authData?.roles?.some(
            (x) => x == 'SuperAdmin' || x == 'Admin' || x == 'Moderator'
          )
        )
          this.canAddHotel = true;
        else this.canAddHotel = false;
      },
    });
  }
  logout() {
    this.authService.logout();
  }
}
