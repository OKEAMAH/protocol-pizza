import { Order } from "../lib/item";

export default function PostOrder({ order }: { order: Order }) {
  return (
    <>
      <div className="flex flex-col w-full bg-white rounded-xl p-3 drop-shadow gap-2">
        <p>Post Order</p>
        <div>
          <p className="text-sm mb-1">Summary</p>
          <div className="text-sm bg-gray-100 p-2 rounded-xl">
            {order.products.map((product) => {
              return (
                <div
                  key={product.iD}
                  className="flex gap-1 items-center w-full"
                >
                  <p>{product.name}</p>
                  <div className="flex-grow min-h-0"></div>
                  <p>${product.price}</p>
                </div>
              );
            })}
            <div className="flex gap-1 items-center w-full">
              <p>Food</p>
              <div className="flex-grow min-h-0"></div>
              <p>${order.amountsBreakdown.foodAndBeverage}</p>
            </div>
            <div className="flex gap-1 items-center w-full">
              <p>Delivery Free</p>
              <div className="flex-grow min-h-0"></div>
              <p>${order.amountsBreakdown.deliveryFee}</p>
            </div>
            <div className="flex gap-1 items-center w-full">
              <p>Tax</p>
              <div className="flex-grow min-h-0"></div>
              <p>${order.amountsBreakdown.tax}</p>
            </div>
            <div className="flex gap-1 items-center border-t-2 w-full">
              <p className="font-bold">Total (USD)</p>
              <div className="flex-grow min-h-0"></div>
              <p className="font-bold">${order.amountsBreakdown.customer}</p>
            </div>
          </div>
        </div>
        <input
          className="bg-gray-100 rounded-xl px-3 py-1 w-full "
          placeholder="Token Address"
        ></input>
        <input
          className="bg-gray-100 rounded-xl px-3 py-1 w-full "
          placeholder="Payment Amount"
        ></input>
        <input
          className="bg-gray-100 rounded-xl px-3 py-1 w-full "
          placeholder="Seller Deposit"
        ></input>
        <input
          className="bg-gray-100 rounded-xl px-3 py-1 w-full "
          placeholder="Buyer Cost"
        ></input>
        <button
          className="w-full bg-orange-500 text-white rounded-xl px-3 py-1 flex items-center justify-center gap-1"
          // onClick={() => addItem()}
        >
          Post Order
        </button>
      </div>
    </>
  );
}
