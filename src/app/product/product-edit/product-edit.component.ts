import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { ProductCreateModel } from '../models/product-create.model';
import { ProductService } from '../product.service';
import { ToastrService } from '../../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  bindingModel: ProductCreateModel
  productId: string
  ownerId: string

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.productId = this.route.snapshot.params['productId']
    this.ownerId = this.route.snapshot.params['ownerId'];
    this.productService.getById(this.productId, this.ownerId).subscribe(productToEdit => {
      // console.log('productToEdit: ')
      // console.log(productToEdit)
      this.bindingModel = productToEdit
    })
  }

  edit() {
    this.bindingModel.price = Number(this.bindingModel.price.toFixed(2))
    const body = { [this.productId]: this.bindingModel };
    this.productService.editProduct(body, this.ownerId).subscribe(() => {
      this.toastrService.success('Product edited successfully.', 'Success!')
      this.router.navigate(['/products/list'])
    }, error => {
      this.toastrService.error(error.error.error + '! ' + error.statusText + '! You can edit only products posted by you.', 'Warning!')
      this.router.navigate(['/products/list'])
    })
  }
}
