import { useState } from "react";
import API from "../utils/api";
import { encryptData } from "../utils/encryption";

export default function VaultItemForm({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    username: "",
    password: "",
    url: "",
    notes: ""
  });

  const secret = localStorage.getItem("secret");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const encryptedPassword = encryptData(form.password, secret);

    const res = await API.post("/vault", {
      title: form.title,
      username: form.username,
      password: encryptedPassword,
      url: form.url,
      notes: form.notes,
    });

    onAdd(res.data); // refresh vault
    setForm({ title: "", username: "", password: "", url: "", notes: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required /><br/><br/>
      <input name="username" value={form.username} onChange={handleChange} placeholder="Username" required /><br/><br/>
      <input name="password" value={form.password} onChange={handleChange} placeholder="Password" required /><br/><br/>
      <input name="url" value={form.url} onChange={handleChange} placeholder="URL" /><br/><br/>
      <input name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" /><br/><br/>
      <button type="submit">Add Item</button>
    </form>
  );
}
