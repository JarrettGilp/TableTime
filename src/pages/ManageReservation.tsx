import { Link } from "react-router-dom";

export default function ManageReservation() {
  return (
    <div style={{ padding: "30px" }}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <button
          style={{
            marginBottom: "20px",
            padding: "10px 16px",
            background: "#ccc",
            color: "black",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          ← Back to Home
        </button>
      </Link>

      <h1>Manage Reservation Page</h1>
    </div>
  );
}
