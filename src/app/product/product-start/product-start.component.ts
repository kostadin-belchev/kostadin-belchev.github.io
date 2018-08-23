import { Component, OnInit } from '@angular/core';
import { ProductListItemModel } from '../models/product-list-item.model';
import { ProductService } from '../product.service';
import { AuthService } from '../../auth/auth.service';
import calcTime from '../helperFunctions/calcTime.js'

@Component({
  selector: 'app-product-start',
  templateUrl: './product-start.component.html',
  styleUrls: ['./product-start.component.css']
})
export class ProductStartComponent implements OnInit {
  products: ProductListItemModel[]
  productFirstSlide: ProductListItemModel
  productSecondSlide: ProductListItemModel
  productThirdSlide: ProductListItemModel
  time: string


  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.productService.getAllStartUpProducts().subscribe((data) => {
      for (const product of data) {
        product.createdOn = calcTime(product.createdOn)
      }
      this.products = data
      // console.log(this.products)
      this.productFirstSlide = this.products[0]
      this.productSecondSlide = this.products[1]
      this.productThirdSlide = this.products[2]
    })
  }

  // calculateTimeAgo(time: string) {
  //   this.time = calcTime(time)
  // }
}
