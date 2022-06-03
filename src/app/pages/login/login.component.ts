import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public users: User[] = [];
  public userSelected: User | null | undefined = null;
  public idUserSelected: string = "";
  public passSelected: string = "";

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userService.getAll()
      .subscribe(data => {
        this.users = data;
        this.idUserSelected = this.users[0].id;
        this.selectUser();
      })
  }

  selectUser() {
    this.userSelected = this.getUserById(this.idUserSelected);
    if (this.userSelected) {
      this.passSelected = this.userSelected.password;
    }
  }

  getUserById(idUser: string) {
    let user = null;
    user = this.users.find((user) => {
      return user.id == idUser;
    });
    return user;
  }

  login() {
    if (this.userSelected) {
      let email = this.userSelected?.email;
      let pass = this.userSelected?.password;
      this.authService.loginAndGet(email, pass)
        .subscribe(() => {
          this.router.navigate(['/profile']);
        });
    }
  }

}
