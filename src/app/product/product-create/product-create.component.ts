import { Component, OnInit } from '@angular/core';
import { ProductCreateModel } from '../models/product-create.model';
import { ToastrService } from '../../../../node_modules/ngx-toastr';
import { Router } from '../../../../node_modules/@angular/router';
import { ProductService } from '../product.service';
import * as firebase from 'firebase'

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  model: ProductCreateModel

  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private productService: ProductService
  ) {
    this.model = new ProductCreateModel('', '', '', undefined, Date.now(), '', '')
  }

  ngOnInit() {
  }

  createProduct() {
    this.model.price = Number(this.model.price.toFixed(2))
    let ownerId = firebase.auth().currentUser.uid
    this.model.createdOn = Date.now()
    this.model.ownerId = ownerId
    this.model.ownerName = firebase.auth().currentUser.displayName
    this.productService.createProduct(this.model, ownerId).subscribe(() => {
      this.toastrService.success('Product added successfully', 'Success!')
      this.router.navigate(['/products/list'])
    })
  }

}
