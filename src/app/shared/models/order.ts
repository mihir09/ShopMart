import { ShoppingCart } from "./shopping-cart";

export class Order{
    datePlaced!: number;
    items!: any[];
  totalPrice: number;
  totalQuantity: number;
    constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart, totalPrice: number, totalQuantity: number){
        this.datePlaced = new Date().getTime();
        this.items= shoppingCart.items.map(i=>{
            return {
              product: {
                title: i.title,
                imageUrl: i.imageUrl,
                price: i.price,
              },
              quantity: i.quantity,
              totalPrice: i.totalPrice
            }
          })
        this.totalPrice = totalPrice;
        this.totalQuantity = totalQuantity;  
    }
}