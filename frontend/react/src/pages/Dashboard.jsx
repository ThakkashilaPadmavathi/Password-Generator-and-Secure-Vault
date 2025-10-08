import { useEffect, useState } from "react";
import API from "../utils/api";
import { decryptData, encryptData } from "../utils/encryption";
import VaultItemForm from "../components/VaultItemForm";
import VaultList from "../components/VaultList";
import Navbar from "../components/Navbar";
import EditModal from "../components/EditModal";

export default function Dashboard() {
  const [vaultItems, setVaultItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const secret = localStorage.getItem("secret");

  useEffect(() => {
    fetchVault();
  }, []);

  const fetchVault = async () => {
    try {
      const res = await API.get("/vault");
      const decrypted = res.data.map((item) => ({
        ...item,
        password: decryptData(item.password, secret) || "",
      }));
      setVaultItems(decrypted);
    } catch (err) {
      console.error("Vault fetch failed:", err);
    }
  };

  const handleAdd = () => fetchVault();

  const handleDelete = async (id) => {
    await API.delete(`/vault/${id}`);
    fetchVault();
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleUpdate = async (updatedItem) => {
    const encryptedPassword = encryptData(updatedItem.password, secret);
    await API.put(`/vault/${updatedItem._id}`, {
      ...updatedItem,
      password: encryptedPassword,
    });
    setEditingItem(null);
    fetchVault();
  };

  const filteredItems = vaultItems.filter((item) =>
    [item.title, item.username, item.url]
      .some((val) => val?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{ padding: "20px" }}>
      <Navbar />
      <h2>Your Secure Vault 🔐</h2>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search by title, username, or URL..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      {/* ➕ Add New */}
      <VaultItemForm onAdd={handleAdd} />

      {/* 📜 Vault List */}
      <VaultList
        items={filteredItems}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      {/* ✏️ Edit Modal */}
      {editingItem && (
        <EditModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
