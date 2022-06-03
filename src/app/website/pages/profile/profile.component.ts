import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: User | null = null;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.user$
      .subscribe(data => {
        this.user = data;
      })
  }

}
