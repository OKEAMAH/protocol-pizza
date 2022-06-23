import { useAccount, useSigner } from "wagmi";
import { useCallback, useEffect, useRef } from "react";
import { createEncryptionKey, decrypt, toHex } from "./core";
import { useEncryptionStore } from "./store";
import nacl from "tweetnacl";
import { encrypt } from "./core";

const scope = `Sign this message if you trust this application to access private information, such as names, addresses, and emails. It costs nothing to sign this message.`;

// function usePrevious(value: any) {
//   const ref = useRef();
//   useEffect(() => {
//     ref.current = value;
//   });
//   return ref.current;
// }

// function useOnSwitchWallet(cb: (address: string) => any) {
//   const account = useAccount();
//   const previous = usePrevious(account.data?.address);

//   useEffect(() => {

//   }, [])
// }

export function useEncryption() {
  const signer = useSigner();
  const account = useAccount();
  const store = useEncryptionStore();
  const hasKey = !!(account.data?.address && store.privateKeys[account.data?.address])


  // Creates an encryption key, and stores it.
  const _generate = useCallback(async () => {
    if (!signer.data) {
      console.error("Signer does not exist");
      return;
    }
    const key = await createEncryptionKey(signer.data, scope);

    store.setPrivateKey(await signer.data.getAddress(), key);
  }, [signer.data, store]);

  const _decrypt = useCallback(
    async (
      senderPublicEncryptionKey: string,
      message: string,
      nonce: string
    ) => {
      const hexRegex = /[0-9a-fA-F]+/g;
      if (!hexRegex.test(senderPublicEncryptionKey)) {
        // If you get this error, the public key might be corrupted / bad.
        // Check if it's null or empty. If it's not, check that it's
        // a valid hex string.
        //
        // If the key is in a different format, like base64, consider
        // converting it to hex first.
        console.log(senderPublicEncryptionKey);
        throw new Error(
          "senderPublicEncryptionKey is not a hexidecimal string."
        );
      }

      if (!store.privateKeys[account.data?.address || ""]) {
        // If you're getting this error, you need to prompt the user to sign a
        // messsage with .generate() first. For example:
        //
        //   const encryption = useEncryption();
        //   await encryption.generate();
        //
        throw new Error(
          "Cannot encrypt before generating a private key with encryption.generate()"
        );
      }

      const keypair = nacl.box.keyPair.fromSecretKey(
        toUint8Array(store.privateKeys[account.data?.address || ""])
      );

      const result = decrypt({
        messageStr: message,
        nonceStr: nonce,
        theirPublicKeyStr: senderPublicEncryptionKey,
        mySecretKeyStr: toHex(keypair.secretKey),
      });

      return result;
    },
    [store]
  );

  const _encrypt = useCallback(
    async (receiverPublicEncryptionKey: string, message: string) => {
      const hexRegex = /[0-9a-fA-F]+/g;
      if (!hexRegex.test(receiverPublicEncryptionKey)) {
        // If you get this error, the public key might be corrupted / bad.
        // Check if it's null or empty. If it's not, check that it's
        // a valid hex string.
        //
        // If the key is in a different format, like base64, consider
        // converting it to hex first.
        throw new Error(
          "receiverPublicEncryptionKey is not a hexidecimal string."
        );
      }

      if (!store.privateKeys[account.data?.address || ""]) {
        // If you're getting this error, you need to prompt the user to sign a
        // messsage with .generate() first. For example:
        //
        //   const encryption = useEncryption();
        //   await encryption.generate();
        //
        throw new Error(
          "Cannot encrypt before generating a private key with encryption.generate()"
        );
      }

      const keypair = nacl.box.keyPair.fromSecretKey(
        toUint8Array(store.privateKeys[account.data?.address || ""])
      );

      const result = encrypt({
        receiverPublicEncryptionKey,
        message,
        senderPrivatekey: keypair.secretKey,
      });

      return {
        message: toHex(result.encrypted),
        nonce: toHex(result.nonce),
        publicKey: toHex(keypair.publicKey),
        scope: scope,
      };
    },
    [store]
  );

  return {
    generate: _generate,
    encrypt: _encrypt,
    decrypt: _decrypt,
    hasKey,
    scope: scope,
    keypair: store.privateKeys[account.data?.address || ""]
      ? nacl.box.keyPair.fromSecretKey(toUint8Array(store.privateKeys[account.data?.address || ""]))
      : undefined,
  };
}

function toUint8Array(obj: any) {
  if (Array.isArray(obj)) {
    return Uint8Array.from(obj);
  }

  // When storing a Uint8Array in local storage, it sometimes gets converted
  // into an "object" where the keys are the indices of the array.
  if (typeof obj === "object") {
    return Uint8Array.from(Object.values(obj));
  }

  throw new Error("Can't convert object to Uint8Array.");
}
