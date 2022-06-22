import { useRouter } from "next/router";
import { useOfferMetadata } from "../lib/client/metadata/useOrderMetadata";

export default function Place() {
  const router = useRouter();
  const orderAddress = (router.query.id as string) || "";
  const offer = useOfferMetadata(
    42,
    "0x21931f2343e1366e938a551c0aa2300ddec8be90",
    "0xc05c2aadfadb5cdd8ee25ec67832b524003b2e37",
    0
  );

  console.log(offer.data);

  // TODO: Get item JSON from rwtp

  // TODO: Validate that order will place

  // TODO: Place the order

  return (
    <div className="max-w-2xl mx-auto px-5 py-10 flex flex-col gap-10">
      <div className="flex flex-col w-full bg-white rounded-xl p-3 drop-shadow gap-2">
        <p>Validate Order</p>
        <input
          className="bg-gray-100 rounded-xl px-3 py-1 w-full"
          placeholder="Order Address"
          // onChange={(event) => {
          // setOrderAddress(event.target.value);
          // }}
        ></input>
        <button
          className="w-full bg-orange-500 text-white rounded-xl px-3 py-1 flex items-center justify-center gap-1"
          // onClick={() => addItem()}
        >
          Load
        </button>
      </div>
      <div className="flex flex-col w-full bg-white rounded-xl p-3 drop-shadow gap-2">
        <p>Place Order</p>
        <button
          className="w-full bg-orange-500 text-white rounded-xl px-3 py-1 flex items-center justify-center gap-1"
          // onClick={() => addItem()}
        >
          Validate
        </button>
      </div>
    </div>
  );
}
