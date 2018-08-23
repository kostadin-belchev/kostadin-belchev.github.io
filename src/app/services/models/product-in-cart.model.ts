export class ProductInCartModel {
  constructor(
    public productId: string,
    public name: string,
    public imagePath: string,
    public description: string,
    public price: number,
    public createdOn: number,
    public ownerId: string,
    public ownerName: string
  ) {  }
}