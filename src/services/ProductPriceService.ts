export class ProductPriceService {
  static calculateTotalPrice(
    price: number,
    quantity: number,
    discount: number = 0, // Default discount value
  ): number {
    const totalPrice = price * quantity;
    const discountedPrice = totalPrice - (totalPrice * discount) / 100;
    return discountedPrice;
  }
}
