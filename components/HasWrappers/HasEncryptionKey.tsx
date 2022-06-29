import { LockClosedIcon } from "@heroicons/react/solid";
import { useEncryption } from "../../lib/client/encryption/hooks";

export default function HasEncryptionKey({
  children,
}: {
  children: React.ReactNode;
}) {
  const encryption = useEncryption();

  async function onGenerate() {
    await encryption.generate();
  }

  if (!encryption.hasKey) {
    return (
      <>
        <div className="flex flex-col w-full bg-white rounded-xl p-3 drop-shadow gap-2">
          <p>Is it cool if this website encrypts your shipping info?</p>
          <button
            className="w-full bg-orange-500 text-white rounded-xl px-3 py-1 flex items-center justify-center gap-1"
            onClick={() => onGenerate()}
          >
            Ya, go for it dude
            <LockClosedIcon className="h-4 w-4" />
          </button>
        </div>
      </>
    );
  }
  return <>{children}</>;
}
