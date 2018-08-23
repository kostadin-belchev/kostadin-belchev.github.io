import { Component, OnInit } from '@angular/core';
import { Observable } from '../../../../node_modules/rxjs';
import { ProductService } from '../product.service';
import { ProductListItemModel } from '../models/product-list-item.model';
import calcTime from '../helperFunctions/calcTime.js'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products$: Observable<ProductListItemModel[]>

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.products$ = this.productService.getAllProducts()
  }

  calcTime(time) {
    return calcTime(time)
  }
}
