export default interface ICreateProductDTO {
  title: string;
  description: string;
  price: number;
  discount?: number;
  categoryId: string;
}
