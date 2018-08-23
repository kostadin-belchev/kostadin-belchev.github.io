import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ProductListItemModel } from './models/product-list-item.model';
import { ProductCreateModel } from './models/product-create.model';
import * as firebase from 'firebase'

const baseUrl = 'https://ng-e-shop.firebaseio.com/products/'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private httpClient: HttpClient
  ) {  }
  
  getAllStartUpProducts() {
    return this.httpClient.get(`${baseUrl}.json`).pipe(map((res: Response) => {
      // console.log(res)
      const userIds = Object.keys(res)
        const products: ProductListItemModel[] = []
        for (const userId of userIds) {
          let user = res[userId]
          // console.log(user)
          const ids = Object.keys(user)
          for (const i of ids) {
            products.push(new ProductListItemModel(i, user[i].name, user[i].imagePath, user[i].description, user[i].price, user[i].createdOn, user[i].ownerId, user[i].ownerName))
          }
        }
        return products
    }))
  }

  getAllProducts() {
    return this.httpClient.get(`${baseUrl}.json`).pipe(map((res: Response) => {
      // console.log(res)
      const userIds = Object.keys(res)
        const products: ProductListItemModel[] = []
        for (const userId of userIds) {
          let user = res[userId]
          // console.log(user)
          const ids = Object.keys(user)
          for (const i of ids) {
            products.push(new ProductListItemModel(i, user[i].name, user[i].imagePath, user[i].description, user[i].price, user[i].createdOn, user[i].ownerId, user[i].ownerName))
          }
        }
        return products
    }))
  }

  createProduct(body: ProductCreateModel, ownerUid: string) {
    return this.httpClient.post(baseUrl + ownerUid + '/' + '.json', body)
  }

  getById(productId: string, ownerId: string) {
    // console.log('productId:')
    // console.log(productId)
    // console.log('ownerId: ')
    // console.log(ownerId)
    return this.httpClient.get<ProductListItemModel>(baseUrl + ownerId + '/' + productId + '/.json')
  }

  editProduct(body, ownerId: string) {
    return this.httpClient.patch(baseUrl + ownerId + '/.json', body)
  }

  deleteProductById(ownerIdToDelete: string, productId: string) {
    return this.httpClient.delete(baseUrl + ownerIdToDelete + '/' + productId + '/.json')
  }

  getAllProductsByUserId(userId: string) {
    return this.httpClient.get(baseUrl + userId + '/.json');
  }
}