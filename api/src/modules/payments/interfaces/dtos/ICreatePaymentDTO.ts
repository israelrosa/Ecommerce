export default interface ICreatePaymentDTO {
  holder: string;
  cardNumber: string;
  expirationDate: Date;
  securityCode: string;
  userId: string;
}
