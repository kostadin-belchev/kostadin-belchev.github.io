import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserCreateModel } from './models/user-create.model';
import * as firebase from 'firebase'
import { database } from 'firebase/database'
import { map } from 'rxjs/operators';
import { ProductInCartModel } from './models/product-in-cart.model';
import { ToastrService } from '../../../node_modules/ngx-toastr';
import { Router } from '../../../node_modules/@angular/router';
import * as admin from 'firebase-admin';

const baseUrl = 'https://ng-e-shop.firebaseio.com/users/'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  getAllUsers() {
    return this.httpClient.get(`${baseUrl}.json`).pipe(map((res: Response) => {
      // console.log(res)
      const userIds = Object.keys(res)
      const users: UserCreateModel[] = []
      for (const userId of userIds) {
        let user = res[userId]
        // console.log('user: ')
        // console.log(user)
        if (user) {
          users.push(new UserCreateModel(user.displayName, user.cart, user.active, user.email, user.userId, user.photoUrl, user.roles))
        }
      }
      // console.log('HERE carts: ')
      // console.log(carts)
      return users
    }))
  }

  createUser = (user, uid) => {
    let obj = {}
    obj[uid] = user
    firebase.database().ref("users").update(obj).then(() => {
      // added correctly
      console.log('User Added correctly!')
    }).catch((err) => console.log(err))
  }

  getUserByUserId(id: string) {
    // console.log('to get users you need to be logged in')
    return this.httpClient.get(baseUrl + id + '/.json')
  }

  addProductToUserCartById = (productId: string, body: ProductInCartModel) => {
    let userId = firebase.auth().currentUser.uid
    let obj = {}
    obj[productId] = body
    firebase.database().ref("users/" + userId + '/cart').update(obj).then(() => {
      this.toastrService.success('Item added to cart successfully.', 'Success!')
      //   this.router.navigate(['/products/list'])
    }).catch(error => {
      this.toastrService.error(error.error.error + '! ' + error.statusText + '!', 'Warning!')
      this.router.navigate(['/products'])
    })
    // return this.httpClient.post(baseUrl + userId + '/cart/'+ productId + '.json', body)
  }

  getMyCart() {
    let userId = firebase.auth().currentUser.uid
    return this.httpClient.get(`${baseUrl}${userId}/cart.json`).pipe(map((res: Response) => {
      // console.log(res)
      const cartProducts: ProductInCartModel[] = []
      if (res === null) {
        // cart is empty
        return cartProducts
      }
      const cartKeys = Object.keys(res)
      for (const itemKey of cartKeys) {
        let item = res[itemKey]
        // console.log(item)
        cartProducts.push(new ProductInCartModel(itemKey, item.name, item.imagePath, item.description, item.price, item.createdOn, item.ownerId, item.ownerName))
      }
      return cartProducts
    }))
  }

  getAllCarts() {
    return this.httpClient.get(`${baseUrl}.json`).pipe(map((res: Response) => {
      // console.log(res)
      const userIds = Object.keys(res)
      const carts: [ProductInCartModel[]] = [[]]
      for (const userId of userIds) {
        let user = res[userId]
        // console.log('user: ')
        // console.log(user)
        if (user['cart']) {
          const cartKeys = Object.keys(user['cart'])
          // console.log('cartKeys: ')
          // console.log(cartKeys)
          let currCart = []
          for (const itemKey of cartKeys) {
            let item = user['cart'][itemKey]
            // console.log('item: ')
            // console.log(item)
            currCart.push(new ProductInCartModel(itemKey, item.name, item.imagePath, item.description, item.price, item.createdOn, item.ownerId, item.ownerName))
          }
          // console.log('currCart: ')
          // console.log(currCart)
          carts.push(currCart)
        }
      }
      // console.log('HERE carts: ')
      // console.log(carts)
      return carts
    }))
  }

  removeProductFromCart(productIdToRemove: string) {
    let userId = firebase.auth().currentUser.uid
    return this.httpClient.delete(baseUrl + userId + '/cart/' + productIdToRemove + '/.json')
  }

  getCurrLoggedInUser() {
    let userId = firebase.auth().currentUser.uid
    return this.httpClient.get(`${baseUrl}${userId}/.json`)
  }

  isAdmin() {
    let isAdmin: boolean = false
    if (firebase.auth().currentUser) {
      let userId = firebase.auth().currentUser.uid
      firebase.database().ref(`admins/${userId}`).on("value", (data) => {
        // console.log('checking...')
        // console.log(data)
        if (data['node_']['value_']) {
          // console.log('should return true')
          isAdmin = true
        } else {
          isAdmin = false
        }
      }, (errorObject) => {
        // console.log('The read failed: ' + errorObject.code)
        isAdmin = false
      })
    }
    return isAdmin
  }

}