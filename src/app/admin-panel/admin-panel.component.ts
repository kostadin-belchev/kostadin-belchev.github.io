import { Component, OnInit } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';
import { ProductInCartModel } from '../services/models/product-in-cart.model';
import { UserService } from '../services/user.service';
import * as firebase from 'firebase'
import { ToastrService } from '../../../node_modules/ngx-toastr';
import { NgForm } from '@angular/forms';
import { UserCreateModel } from '../services/models/user-create.model';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  carts$: Observable<[ProductInCartModel[]]>
  users: UserCreateModel[]

  constructor(
    private userService: UserService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.carts$ = this.userService.getAllCarts()
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data
    })
  }

  sendPasswordResetEmailForm(form: NgForm) {
    let auth = firebase.auth();
    let emailAddress = form.value.email
    // console.log(emailAddress)
    auth.sendPasswordResetEmail(emailAddress).then(() => {
      // Email sent.
      this.toastrService.success('Email sent', 'Success!')
    }).catch((error) => {
      // An error happened.
      this.toastrService.error('An error happened!\n' + error, 'Warning!')
    });
  }

  sendPasswordResetEmail(emailAddress: string) {
    let auth = firebase.auth();
    auth.sendPasswordResetEmail(emailAddress).then(() => {
      // Email sent.
      this.toastrService.success('Email sent', 'Success!')
    }).catch((error) => {
      // An error happened.
      this.toastrService.error('An error happened!\n' + error, 'Warning!')
    });
  }

  disableUser(userToBeDisabled) {
    // console.log('userToBeDisabled: ')
    // console.log(userToBeDisabled)
    // console.log('TODO disableUser')
    let uid = userToBeDisabled['userId']
    let obj = {}
    obj[uid] = userToBeDisabled
    obj['active'] = false
    firebase.database().ref(`users/${uid}`).update(obj).then(() => {
      // added correctly
      // console.log('User disabled!')
      this.toastrService.success('User disabled! He/she will no longer have access write to the database. ', 'Success!')
    }).catch((error) => this.toastrService.error('An error happened!\n' + error, 'Warning!'))
  }

  enableUser(userToBeEnabled) {
    // console.log('userToBeEnabled: ')
    // console.log(userToBeEnabled)
    let uid = userToBeEnabled['userId']
    let obj = {}
    obj[uid] = userToBeEnabled
    obj['active'] = true
    firebase.database().ref(`users/${uid}`).update(obj).then(() => {
      // added correctly
      // console.log('User enabled!')
      this.toastrService.success('User enabled! He/she will have access to write the database. ', 'Success!')
    }).catch((error) => this.toastrService.error('An error happened!\n' + error, 'Warning!'))
  }

}
