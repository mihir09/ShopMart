import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart{
    constructor(public items: ShoppingCartItem[]) {}
    
    get totalItemsCount(){
        let productId:any;
        let count = 0;
        for(productId in this.items)
          count += this.items[productId].quantity;
        return count;
    }
}