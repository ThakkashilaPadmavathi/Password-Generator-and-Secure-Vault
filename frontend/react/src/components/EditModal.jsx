import { useState } from "react";

export default function EditModal({ item, onClose, onUpdate }) {
  const [form, setForm] = useState({ ...item });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(form);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          width: "400px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        }}
      >
        <h3>Edit Vault Item</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            required
            style={{ width: "100%", marginBottom: "8px" }}
          />
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            required
            style={{ width: "100%", marginBottom: "8px" }}
          />
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            style={{ width: "100%", marginBottom: "8px" }}
          />
          <input
            name="url"
            value={form.url}
            onChange={handleChange}
            placeholder="URL"
            style={{ width: "100%", marginBottom: "8px" }}
          />
          <input
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Notes"
            style={{ width: "100%", marginBottom: "8px" }}
          />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
