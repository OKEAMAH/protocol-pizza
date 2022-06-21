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
