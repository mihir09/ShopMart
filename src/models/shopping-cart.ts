import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart{
    items: ShoppingCartItem[] = [];

    constructor(public itemsMap: { [productId: string]: ShoppingCartItem}) {
        for (let productId in itemsMap){
            let item = itemsMap[productId]
            this.items.push(new ShoppingCartItem(item.product, item.quantity));
        }
    }

    get totalPrice(){
        let productId:any;
        let sum = 0;
        for(productId in this.items)
          sum += this.items[productId].totalPrice;
        return sum;
    }

    get totalItemsCount(){
        let productId:any;
        let count = 0;
        for(productId in this.itemsMap)
          count += this.itemsMap[productId].quantity;
        return count;
    }
}