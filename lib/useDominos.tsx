import dominos from 'dominos';
import { Address } from './customer';
import { Menu } from './menu';

export async function getNearbyStores(address: Address) {
   const nearbyStores = await new dominos.NearbyStores(address);
   for (const store of nearbyStores.stores) {
      console.log(store);
   }
   return nearbyStores.stores;
}

export async function getStoreMenu(storeID: string): Promise<Menu> {
   const menu = await new dominos.Menu(storeID);
   return menu as Menu;
}

export async function validate(storeID: string) {
   const pizza = new dominos.Item({
      "code": "C_12SCREEN"
   })
   const customer = new dominos.Customer({
      "address": "10014"
   });
   const order = new dominos.Order(customer);
   order.storeID = storeID;
   order.addItem(pizza);
   const res = await order.validate();
   console.log(res);
   // const menu = await new dominos.Menu(storeID);
   // return menu as Menu;
}