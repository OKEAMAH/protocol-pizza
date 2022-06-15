import dominos from "dominos";
import { Address, Customer } from "./customer";
import { Item } from "./item";
import { Menu } from "./menu";

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

export async function validate(
  storeID: string,
  customer: Customer,
  address: Address,
  items: Item[]
) {
  let newCustomer = new dominos.Customer(customer);
  newCustomer.address = new dominos.Address(address);
  let order = new dominos.Order(newCustomer);
  order.storeID = storeID;
  order.serviceMethod = "Delivery";
  for (const item of items) {
    order.addItem(new dominos.Item(item));
  }
  try {
    const res = await order.price();
    return res;
  } catch (error) {
    console.log(error);
    return {
      error: error
    }
  }
}
