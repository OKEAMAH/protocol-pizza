import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import solidity from "react-syntax-highlighter/dist/cjs/languages/prism/solidity";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import { AppHeader } from "../components/AppHeader";
import { ArrowDownIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";
import AddressBuilder from "../components/AddressBuilder";
import CustomerBuilder from "../components/CustomerBuilder";
import ItemBuilder from "../components/ItemBuilder";
import PostOrder from "../components/PostOrder";
import StoreFinder from "../components/StoreFinder";
import { Customer, Address } from "../lib/customer";
import { Order } from "../lib/item";
import HasEncryptionKey from "../components/HasWrappers/HasEncryptionKey";
import HasWalletConnected from "../components/HasWrappers/HasWalletConnected";

SyntaxHighlighter.registerLanguage("solidity", solidity);
SyntaxHighlighter.registerLanguage("typescript", typescript);

export default function Landing() {
  const [customer, setCustomer] = useState<Customer>({} as Customer);
  const [customerIsValid, setCustomerIsValid] = useState<boolean>(false);
  const [address, setAddress] = useState<Address>({} as Address);
  const [addressIsValid, setAddressIsValid] = useState<boolean>(false);
  const [storeID, setStoreID] = useState<string>("");
  const [order, setOrder] = useState<Order>({} as Order);

  useEffect(() => {
    if (!addressIsValid || !customerIsValid) {
      setStoreID("");
    }
  }, [addressIsValid, customerIsValid]);

  useEffect(() => {
    setOrder({} as Order);
  }, [storeID]);

  return (
    <div className="flex h-full flex-1 flex-col justify-between">
      <AppHeader>
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
                  order={order}
                  setOrder={setOrder}
                />
              </>
            )}
            {order.orderID && (
              <>
                <ArrowDownIcon className="h-4 w-4 mx-auto text-gray-500" />
                <HasWalletConnected>
                  <HasEncryptionKey>
                    <PostOrder
                      storeID={storeID}
                      customer={customer}
                      address={address}
                      order={order}
                      setOrder={setOrder}
                    />
                  </HasEncryptionKey>
                </HasWalletConnected>
              </>
            )}
          </div>
        </div>
      </AppHeader>
    </div>
  );
}
