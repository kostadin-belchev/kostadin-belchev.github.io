import { ProductInCartModel } from "./product-in-cart.model";

export class UserCreateModel {
  constructor(
    public displayName: string,
    public cart: {},
    public active: boolean,
    public email: string,
    public userId: string,
    public photoUrl: string,
    public roles: [string]
  ) {  }
}