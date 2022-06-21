import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import solidity from "react-syntax-highlighter/dist/cjs/languages/prism/solidity";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import { AppHeader } from "../components/AppHeader";
import { ArrowDownIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";
import AddressBuilder from "../components/AddressBuilder";
import CustomerBuilder from "../components/CustomerBuilder";
import ItemBuilder from "../components/ItemBuilder";
import OrderBuilder from "../components/OrderBuilder";
import PostOrder from "../components/PostOrder";
import StoreFinder from "../components/StoreFinder";
import { Customer, Address } from "../lib/customer";
import { Item, Order } from "../lib/item";

SyntaxHighlighter.registerLanguage("solidity", solidity);
SyntaxHighlighter.registerLanguage("typescript", typescript);

export default function Landing() {
  const [customer, setCustomer] = useState<Customer>({} as Customer);
  const [customerIsValid, setCustomerIsValid] = useState<boolean>(false);
  const [address, setAddress] = useState<Address>({} as Address);
  const [addressIsValid, setAddressIsValid] = useState<boolean>(false);
  const [storeID, setStoreID] = useState<string>("");
  const [items, setItems] = useState<Item[]>(new Array<Item>());
  const [order, setOrder] = useState<Order>({} as Order);

  useEffect(() => {
    if (!addressIsValid || !customerIsValid) {
      setStoreID("");
    }
  }, [addressIsValid, customerIsValid]);

  useEffect(() => {
    setItems(new Array<Item>());
    setOrder({} as Order);
  }, [storeID]);

  return (
    <AppHeader>
      <div className="bg-orange-50 h-full">
        <div className="max-w-2xl mx-auto px-5 py-10 flex flex-col gap-10">
          <p className="text-3xl text-center">Order Pizza</p>
          <div className="flex flex-col gap-5 max-w-md mx-auto px-2">
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
                <ItemBuilder
                  storeID={storeID}
                  customer={customer}
                  address={address}
                  items={items}
                  setItems={setItems}
                  setOrder={setOrder}
                />
              </>
            )}
            {items.length > 0 && (
              <>
                <ArrowDownIcon className="h-4 w-4 mx-auto text-gray-500" />
                <OrderBuilder
                  storeID={storeID}
                  customer={customer}
                  address={address}
                  items={items}
                  setItems={setItems}
                  order={order}
                  setOrder={setOrder}
                />
              </>
            )}
            {order.orderID && (
              <>
                <ArrowDownIcon className="h-4 w-4 mx-auto text-gray-500" />
                <PostOrder order={order} />
              </>
            )}
          </div>
          <div>
            <p className="text-3xl font-serif italic">
              "Blockchain technologies facilitate few, if any, real-economy
              uses."
            </p>
            <p className="text">
              - Someone who hasn't bought a pizza with crypto
            </p>
          </div>
          <p className="text-3xl text-center">How it Works</p>
          <p>TODO</p>
        </div>
      </div>
    </AppHeader>
  );
}
