import { ArrowDownIcon } from "@heroicons/react/solid";
import { useState } from "react";
import AddressBuilder from "../components/AddressBuilder";
import { AppHeader } from "../components/AppHeader";
import CustomerBuilder from "../components/CustomerBuilder";
import OrderBuilder from "../components/OrderBuilder";
import StoreFinder from "../components/StoreFinder";
import { Address, Customer } from "../lib/customer";

export default function Order() {
  const [customer, setCustomer] = useState<Customer>({} as Customer);
  const [customerIsValid, setCustomerIsValid] = useState<boolean>(false);
  const [address, setAddress] = useState<Address>({} as Address);
  const [addressIsValid, setAddressIsValid] = useState<boolean>(false);
  const [storeID, setStoreID] = useState("");

  return (
    <AppHeader>
      <div className="flex flex-col gap-5 pt-10 max-w-md mx-auto px-2">
        <CustomerBuilder
          customer={customer}
          setCustomer={setCustomer}
          setCustomerIsValid={setCustomerIsValid}
        />
        {customerIsValid && (<ArrowDownIcon className="h-4 w-4 mx-auto text-gray-500"/>)}
        {customerIsValid && (
          <AddressBuilder
            address={address}
            setAddress={setAddress}
            setAddressIsValid={setAddressIsValid}
          />
        )}
        {addressIsValid && (<ArrowDownIcon className="h-4 w-4 mx-auto text-gray-500"/>)}
        {addressIsValid && (
          <StoreFinder
            address={address}
            storeID={storeID}
            setStoreID={setStoreID}
          />
        )}
        <OrderBuilder storeID={storeID} />
      </div>
    </AppHeader>
  );
}
