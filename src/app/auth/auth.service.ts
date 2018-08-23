import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { ToastrService } from '../../../node_modules/ngx-toastr';
import { Router } from '@angular/router'
import { UserService } from '../services/user.service';
import { UserCreateModel } from '../services/models/user-create.model';
import { ProductInCartModel } from '../services/models/product-in-cart.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private userService: UserService
  ) { }

  signUp(email: string, password: string, username: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then((registeredUser) => {
      // console.log(registeredUser)
      this.toastrService.success('Registered successfully.', 'Success!')
      this.router.navigate(['/auth/signin'])
      let user = firebase.auth().currentUser;
      
      user.updateProfile({
        displayName: username,
        photoURL: "https://www.bing.com/images/search?view=detailV2&ccid=GX%2b5VV6G&id=966A8A86B3CE355297371BE4881C9C6445ADF21C&thid=OIP.GX-5VV6GChstVIyY8zzs7gHaJi&mediaurl=https%3a%2f%2fcamo.githubusercontent.com%2f341831200626efe3e0cf83317801fcac2200fbe2%2f68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f323639323831302f323130343036312f34643839316563302d386637362d313165332d393230322d6637333934306431306632302e706e67&exph=358&expw=278&q=default+avatar+image&simid=608022090080914380&selectedIndex=15"
      }).then(() => {
        // console.log('Username and photo of user created.')
        // [new ProductInCartModel('product name cart', 9, 'some image path cart')]
        let body = new UserCreateModel(registeredUser.user.displayName, {}, true, registeredUser.user.email, registeredUser.user.uid, registeredUser.user.photoURL, ['regularUser'])
        this.userService.createUser(body, registeredUser.user.uid)//.subscribe()
        // Update successful.
      }).catch((error) => {
        // An error happened.
        console.log(error)
      });
    }).catch(err => this.toastrService.error(err.message, 'Warning!'))
  }

  signIn(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password).then((signedInUser) => {
      let uid = signedInUser.user.uid
      this.userService.getUserByUserId(uid).subscribe((user) => {
        // console.log('user: ')
        // console.log(user)
        if (user['active']) {
          firebase.auth().currentUser.getIdToken().then((token: string) => {
            this.token = token
          })
          this.toastrService.success('Logged in successfully.', 'Success!')
          this.router.navigate(['/products'])
        } else {
          this.toastrService.error('Your account has been disabled!', 'Warning!')
          this.router.navigate(['/products'])
          this.signOut()
        }
      })
    }).catch(err => {
      this.toastrService.error(err.message, 'Warning')
    })
  }

  signOut() {
    firebase.auth().signOut().then(() => {
      this.toastrService.success('Logged out successfully.', 'Success')
      this.router.navigate(['/auth/signin'])
      this.token = null
    }).catch(err => this.toastrService.error(err.message, 'Warning'))
  }

  getToken() { // refresh the token
    if (firebase.auth().currentUser) {
      firebase.auth().currentUser.getIdToken().then((token: string) => this.token = token)
    }
    return this.token
  }

  getUsername() {
    if (firebase.auth().currentUser) {
      let username = firebase.auth().currentUser.displayName
      // console.log(firebase.auth().currentUser)
      return username
    }
  }

  getCurrLoggedUserId() {
    if (firebase.auth().currentUser) {
      let userId = firebase.auth().currentUser.uid
      return userId
    }
  }

  isAuthenticated() {
    return this.token != null
  }
}