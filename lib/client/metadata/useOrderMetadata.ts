import { useSubgraph } from "./useSubgraph";
import { Order } from "rwtp";
import { BigNumber } from "ethers";

export interface ERC20Data {
  decimals: number;
  symbol: string;
  name: string;
  address: string;
}

const ERC20_FIELDS = `
    decimals
    symbol
    name
    address
  `;

export interface OrderData {
  id: string;
  address: string;
  uri: string;
  title: string;
  description: string;
  primaryImage: string;
  encryptionPublicKey: string;
  tokenAddressesSuggested: string[];
  tokensSuggested: ERC20Data[];
  priceSuggested: string;
  sellersStakeSuggested: string;
  buyersCostSuggested: string;
  suggestedTimeout: string;
  error: string;
  offers: string;
  offerCount: string;
  maker: string;
  createdAt: string;
  offerSchema: string;
  offerSchemaUri: string;
}

const ORDER_FIELDS = `
    address
    uri
    title
    description
    primaryImage
    encryptionPublicKey
    tokenAddressesSuggested
    tokensSuggested {
      ${ERC20_FIELDS}
    }
    priceSuggested
    sellersStakeSuggested
    buyersCostSuggested
    suggestedTimeout
    error
    offers
    offerCount
    maker
    createdAt
    offerSchema
    offerSchemaUri
  `;

export interface OfferHistory {
  timestamp: string;
  state: string;
  makerCanceled: boolean;
  takerCanceled: boolean;
}

const OFFER_HISTORY_FIELDS = `
    timestamp
    state
    makerCanceled
    takerCanceled
  `;

export interface OfferData {
  index: string;
  taker: string;
  price: string;
  tokenAddress: string;
  token: ERC20Data;
  buyersCost: string;
  sellersStake: string;
  timeout: string;
  uri: string;
  maker: string;
  messagePublicKey: string;
  messageNonce: string;
  message: string;
  timestamp: string;
  state: string;
  order: OrderData;
  acceptedAt: string;
  makerCanceled: string;
  takerCanceled: string;
  history: OfferHistory[];
}

const OFFER_FIELDS = `
    index
    taker
    price
    buyersCost
    sellersStake
    timeout
    uri
    maker
    messagePublicKey
    messageNonce
    message
    timestamp
    state
    order {
      ${ORDER_FIELDS}
    }
    acceptedAt
    makerCanceled
    takerCanceled
    tokenAddress
    token {
      ${ERC20_FIELDS}
    }
    history(orderBy: timestamp) {
      ${OFFER_HISTORY_FIELDS}
    }
  `;

function useOrdersWrapperWithMetadata<T>(
  chainId: number,
  queryString: string,
  args: any
) {
  const metadata = useSubgraph<T>(chainId, [
    `
      query metadata($first:Int, $skip:Int ){
        ${queryString}
      }
      `,
    args,
  ]);
  return {
    metadata: metadata,
    data: metadata.data,
  };
}

export function useOrdersMetadata(
  chainId: number,
  args: {
    first: number;
    skip: number;
    searchText: string;
  }
) {
  const searchArg = args.searchText
    ? `orderSearch(first:$first, skip:$skip, text:"${args.searchText}:*")`
    : `orders(first:$first, skip:$skip)`;
  let res = useOrdersWrapperWithMetadata(
    chainId,
    `
      ${searchArg} {
        ${ORDER_FIELDS}
      }
      `,
    {
      skip: args.skip,
      first: args.first,
    }
  ) as any;
  const data = args.searchText ? res.data?.orderSearch : res.data?.orders;
  return {
    ...res.metadata,
    data: data,
  };
}

// Returns information about a sell order
export function useOrderMetadata(chainId: number, address: string) {
  const metadata = useSubgraph<{
    orders: OrderData[];
  }>(chainId, [
    `
    query metadata($address: String){
      orders(where: {address:$address}) {
        ${ORDER_FIELDS}
      }
    }
    `,
    { address: address },
  ]);

  return {
    ...metadata,
    data: metadata.data?.orders[0],
  };
}

// Returns information about a sell order
export function useOfferMetadata(
  chainId: number,
  order: string,
  taker: string,
  index: number
) {
  const metadata = useSubgraph<{
    offer: OfferData;
  }>(chainId, [
    `
    query data($id: ID){
      offer(id:$id) {
        ${OFFER_FIELDS}
      }
    }
    `,
    { id: `${taker}-${index}-${order}` },
  ]);

  console.log(`${taker}-${index}-${order}`);
  // 0xc05c2aaDfAdb5CdD8EE25ec67832B524003B2E37-0-0x21931f2343E1366E938a551C0aA2300DDeC8bE90
  // 0xc05c2aadfadb5cdd8ee25ec67832b524003b2e37-0-0x21931f2343e1366e938a551c0aa2300ddec8be90
  // 0xc05c2aaDfAdb5CdD8EE25ec67832B524003B2E37-0-0x21931f2343E1366E938a551C0aA2300DDeC8bE90

  return {
    ...metadata,
    data: metadata.data?.offer,
  };
}
