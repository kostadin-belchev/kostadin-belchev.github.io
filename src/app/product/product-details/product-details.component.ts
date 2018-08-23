import { Component, OnInit } from '@angular/core';
import { Observable } from '../../../../node_modules/rxjs';
import { ProductListItemModel } from '../models/product-list-item.model';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { ToastrService } from '../../../../node_modules/ngx-toastr';
import calcTime from '../helperFunctions/calcTime.js'
import { UserService } from '../../services/user.service';
import { ProductInCartModel } from '../../services/models/product-in-cart.model';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product$: Observable<ProductListItemModel>
  productId: string
  ownerId: string

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.productId = this.route.snapshot.params['productId']
    this.ownerId = this.route.snapshot.params['ownerId'];
    // console.log(this.ownerId)
    this.product$ = this.productService.getById(this.productId, this.ownerId)
  }

  deleteProduct(owenerIdToDelete: string, productIdToDelete: string) {
    // console.log('TODO delete')
    this.productService.deleteProductById(owenerIdToDelete, productIdToDelete).subscribe(() => {
      // console.log(data)
      this.toastrService.success('Item deleted successfully.', 'Success!')
      this.router.navigate(['/products/list'])
    }, error => {
      this.toastrService.error(error.error.error + '! ' + error.statusText + '! You can delete only products posted by you.', 'Warning!')
      this.router.navigate(['/products'])
    })
  }

  addProductToUserCart(productIdToAdd: string, productBody: ProductInCartModel) {
    // console.log('Product add to cart TODO')
    // console.log(productIdToAdd)
    this.userService.addProductToUserCartById(productIdToAdd, productBody)
      // .subscribe(() => {
      //   this.toastrService.success('Item added to cart successfully.', 'Success!')
      //   this.router.navigate(['/products/list'])
      // }, error => {
      //   this.toastrService.error(error.error.error + '! ' + error.statusText + '!', 'Warning!')
      //   this.router.navigate(['/products'])
      // })
  }

  calcTime(time) {
    return calcTime(time)
  }
}
