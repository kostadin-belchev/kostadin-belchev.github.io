import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from '../../../../node_modules/rxjs';
import { ProductInCartModel } from '../../services/models/product-in-cart.model';
import { ToastrService } from '../../../../node_modules/ngx-toastr';
import { Router } from '../../../../node_modules/@angular/router';
import * as firebase from 'firebase'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  productsInCart$: Observable<ProductInCartModel[]>
  productCount: number

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router,
    private ref: ChangeDetectorRef
  ) {  }

  ngOnInit() {
    this.productsInCart$ = this.userService.getMyCart()
    this.productsInCart$.subscribe((data) => {
      this.productCount = data.length
    })
  }

  removeItemFromCart = (productIdToBeRemoved: string) => {
    // console.log(productIdToBeRemoved)
    let userId = firebase.auth().currentUser.uid
    this.userService.removeProductFromCart(productIdToBeRemoved).subscribe(() => {
      // success
      this.toastrService.success('Item deleted successfully from cart.', 'Success!')
      this.router.navigate(['/products/list'])
      this.productCount--
    }, error => {
      // error
      this.toastrService.error(error.error.error + '! ' + error.statusText + '!', 'Warning!')
      this.router.navigate(['/products/profile/' + userId])
    })
  }

  
}
