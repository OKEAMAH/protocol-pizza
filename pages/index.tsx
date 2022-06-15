import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import solidity from "react-syntax-highlighter/dist/cjs/languages/prism/solidity";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import Link from "next/link";

SyntaxHighlighter.registerLanguage("solidity", solidity);
SyntaxHighlighter.registerLanguage("typescript", typescript);

export default function Landing() {
  return (
    <div className="bg-orange-50 h-full">
      <div className="flex flex-row p-5 gap-2 items-center">
        <div className="text-3xl">🍕</div>
        <div className="flex flex-col">
          <p className="text-2xl font-black leading-none">Protocol Pizza</p>
          <p className="text-sm leading-none">
            Powered by{" "}
            <a
              href="https://rwtp.org"
              target="_blank"
              className="underline text-sky-500"
            >
              RWTP
            </a>
          </p>
        </div>
        <div className="flex-grow"></div>
        <Link href="/order" passHref>
          <button className="bg-orange-600 rounded px-3 py-1 text-white">
            Launch App
          </button>
        </Link>
      </div>
      <div className="max-w-2xl mx-auto px-5 py-10 flex flex-col gap-10">
        <div>
          <p className="text-3xl font-serif italic">
            "Blockchain technologies facilitate few, if any, real-economy uses."
          </p>
          <p className="text">- Someone who never bought a pizza with crypto</p>
        </div>
      </div>
    </div>
  );
}
