import CopyButton from "./CopyButton";

export default function VaultList({ items, onDelete, onEdit }) {
  if (!items || items.length === 0) {
    return <p>No items found.</p>;
  }

  return (
    <div>
      {items.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "6px",
          }}
        >
          <h4>{item.title}</h4>
          <p>Username: {item.username}</p>
          <p>
            Password: <b>{item.password}</b>{" "}
            <CopyButton text={item.password} />
          </p>
          {item.url && <p>URL: {item.url}</p>}
          {item.notes && <p>Notes: {item.notes}</p>}
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => onEdit(item)}>Edit</button>
            <button onClick={() => onDelete(item._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
