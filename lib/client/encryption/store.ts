import create from "zustand";
import { persist } from "zustand/middleware";

type EncryptionState = {
  privateKeys: {
    [address: string]: Uint8Array;
  }
  setPrivateKey: (_address: string, _privateKey: Uint8Array) => void;
};

/**
 * A "useState" for encryption state that can be accessed anywhere.
 */
export const useEncryptionStore = create<EncryptionState>()(
  persist(
    (set: any) => ({
      setPrivateKey: (address: string, privateKey: Uint8Array) => set((state: EncryptionState) => {
        state.privateKeys[address] = privateKey
        return {...state}
      }),
      privateKeys: {}
    }),
    {
      name: "encryption",
    }
  )
);
