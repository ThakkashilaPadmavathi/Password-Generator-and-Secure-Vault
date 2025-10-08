import { useState } from "react";

export default function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!text || typeof text !== "string") return;
    navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => {
      navigator.clipboard.writeText(""); // clear clipboard
      setCopied(false);
    }, 15000);
  };

  return (
    <button onClick={handleCopy}>
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
