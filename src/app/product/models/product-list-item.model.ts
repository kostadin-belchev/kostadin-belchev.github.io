export class ProductListItemModel {
  constructor(
    public id: string,
    public name: string,
    public imagePath: string,
    public description: string,
    public price: number,
    public createdOn: number,
    public ownerId: string,
    public ownerName: string
  ) {  }
}