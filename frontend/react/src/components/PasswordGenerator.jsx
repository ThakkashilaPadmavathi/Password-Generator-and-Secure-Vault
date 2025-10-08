import { useState } from "react";

export default function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [password, setPassword] = useState("");

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += chars[Math.floor(Math.random() * chars.length)];
    }
    setPassword(pass);
    navigator.clipboard.writeText(pass);
    setTimeout(()=>navigator.clipboard.writeText(""), 15000); // auto-clear after 15s
  };

  return (
    <div className="password-generator">
      <h3>Generate Password</h3>
      <input type="range" min="8" max="32" value={length} onChange={e=>setLength(e.target.value)} />
      <span>{length}</span>
      <button onClick={generatePassword}>Generate & Copy</button>
      {password && <p>{password}</p>}
    </div>
  );
}
