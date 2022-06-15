import { ArrowDownIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import AddressBuilder from "../components/AddressBuilder";
import { AppHeader } from "../components/AppHeader";
import OrderBuilder from "../components/OrderBuilder";
import CustomerBuilder from "../components/CustomerBuilder";
import ItemBuilder from "../components/ItemBuilder";
import StoreFinder from "../components/StoreFinder";
import { Address, Customer } from "../lib/customer";
import { Item } from "../lib/item";

export default function Order() {
  const [customer, setCustomer] = useState<Customer>({} as Customer);
  const [customerIsValid, setCustomerIsValid] = useState<boolean>(false);
  const [address, setAddress] = useState<Address>({} as Address);
  const [addressIsValid, setAddressIsValid] = useState<boolean>(false);
  const [storeID, setStoreID] = useState<string>("");
  const [items, setItems] = useState<Item[]>(new Array<Item>());
  const [orderIsValid, setOrderIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (!addressIsValid || !customerIsValid) {
      setStoreID("");
    }
  }, [addressIsValid, customerIsValid])

  return (
    <AppHeader>
      <div className="flex flex-col gap-5 py-10 max-w-md mx-auto px-2">
        <CustomerBuilder
          customer={customer}
          setCustomer={setCustomer}
          setCustomerIsValid={setCustomerIsValid}
        />
        {customerIsValid && (
          <>
            <ArrowDownIcon className="h-4 w-4 mx-auto text-gray-500" />
            <AddressBuilder
              address={address}
              setAddress={setAddress}
              setAddressIsValid={setAddressIsValid}
            />
          </>
        )}
        {addressIsValid && (
          <>
            <ArrowDownIcon className="h-4 w-4 mx-auto text-gray-500" />
            <StoreFinder
              address={address}
              storeID={storeID}
              setStoreID={setStoreID}
            />
          </>
        )}
        {storeID && (
          <>
            <ArrowDownIcon className="h-4 w-4 mx-auto text-gray-500" />
            <ItemBuilder storeID={storeID} customer={customer} address={address} items={items} setItems={setItems} setOrderIsValid={setOrderIsValid}/>
          </>
        )}
        {items.length > 0 && (
          <>
            <ArrowDownIcon className="h-4 w-4 mx-auto text-gray-500" />
            <OrderBuilder storeID={storeID} customer={customer} address={address} items={items} setItems={setItems} orderIsValid={orderIsValid} setOrderIsValid={setOrderIsValid}/>
          </>
        )}
      </div>
    </AppHeader>
  );
}
