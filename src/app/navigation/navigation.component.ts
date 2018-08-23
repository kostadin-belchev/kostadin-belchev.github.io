import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../services/user.service';
import { Observable } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
  isAdmin: boolean = true

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    // this.userService.isAdmin()
    //   .subscribe((data) => {
    //   console.log('data: ')
    //   console.log(data)
    //   this.isAdmin = data
    // })
  }

  ngOnDestroy() {

  }

  logout() {
    this.authService.signOut()
  }

  getUsername() {
    // this.username = this.authService.getUsername()
    return this.authService.getUsername()
  }

  getIdOfCurrLoggedUser() {
    return this.authService.getCurrLoggedUserId()
  }

  

}
