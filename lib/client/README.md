# React RWTP

This is a little React client for working with RWTP.

## Encryption

To encrypt stuff, use the encryption hook.

```js
const encryption = useEncryption();

// Check if there's a key
encryption.hasKey; // true / false

// Generate a new encryption key
await encryption.generate();

// Encrypt with signature encryption
// Returns valid RWTP offer metadata
const offerMetadata = await encryption.encrypt(
  somePublicEncryptionKey,
  "Some message"
);
```

## Sell Orders and Buy Orders

To interact with a sell or buy order, use the order hook.

```js
const order = useOrder(chainId, address);

// Does it's best to find data
order.metadata.title;

// Submit an offer on the order
await order.contract.submitOffer(
  index, // a uuid
  token, // an address
  price,
  buyersCost,
  sellerStake,
  timeout,
  uri
);
```
