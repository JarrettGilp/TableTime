import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ManageReservations() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<any | null>(null);

  // Fetch all reservations
  useEffect(() => {
    fetch("http://localhost:3000/api/reservations")
      .then((res) => res.json())
      .then((data) => setReservations(data))
      .catch((err) => console.error(err));
  }, []);

  // Handle input changes for the selected reservation
  const handleChange = (field: string, value: any) => {
    if (!selectedReservation) return;
    setSelectedReservation({ ...selectedReservation, [field]: value });
  };

  // Update reservation
  const handleUpdate = async () => {
    if (!selectedReservation) return;
    try {
      const response = await fetch(
        `http://localhost:3000/api/reservations/${selectedReservation.rv_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: selectedReservation.rv_customerfirstname,
            lastName: selectedReservation.rv_customerlastname,
            restaurantName: selectedReservation.rv_restaurantname,
            tableID: selectedReservation.rv_tableid,
            date: selectedReservation.rv_date,
            time: selectedReservation.rv_time,
            partySize: selectedReservation.rv_partysize,
            status: selectedReservation.rv_status,
          }),
        }
      );
      if (!response.ok) throw new Error("Failed to update reservation");
      alert("Reservation updated!");
      const updatedList = await fetch("http://localhost:3000/api/reservations").then((res) =>
        res.json()
      );
      setReservations(updatedList);
      setSelectedReservation(null);
    } catch (err) {
      console.error(err);
      alert("Error updating reservation");
    }
  };


  // Delete reservation
  const handleDelete = async () => {
    if (!selectedReservation) return;
    try {
      const response = await fetch(
        `http://localhost:3000/api/reservations/${selectedReservation.rv_id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete reservation");
      alert("Reservation deleted!");
      setReservations(reservations.filter((r) => r.rv_id !== selectedReservation.rv_id));
      setSelectedReservation(null);
    } catch (err) {
      console.error(err);
      alert("Error deleting reservation");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
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

      <h1 style={{ fontSize: "2rem", marginBottom: "20px", fontWeight: "700" }}>
        Manage Reservations
      </h1>

      {/* Reservation Selection */}
      <label style={{ fontWeight: "600" }}>Select Reservation</label>
      <select
        value={selectedReservation?.rv_id || ""}
        onChange={(e) =>
          setSelectedReservation(
            reservations.find((r) => r.rv_id === Number(e.target.value)) || null
          )
        }
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
          marginBottom: "20px",
        }}
      >
        <option value="">-- Choose a reservation --</option>
        {reservations.map((r) => (
          <option key={r.rv_id} value={r.rv_id}>
            {r.rv_customerfirstname} {r.rv_customerlastname} - {r.rv_restaurantname} (
            {r.rv_date})
          </option>
        ))}
      </select>

      {selectedReservation && (
        <div>
          <label style={{ fontWeight: "600" }}>First Name</label>
          <input
            type="text"
            value={selectedReservation.rv_customerfirstname}
            onChange={(e) => handleChange("rv_customerfirstname", e.target.value)}
            style={inputStyle}
          />

          <label style={{ fontWeight: "600" }}>Last Name</label>
          <input
            type="text"
            value={selectedReservation.rv_customerlastname}
            onChange={(e) => handleChange("rv_customerlastname", e.target.value)}
            style={inputStyle}
          />

          <label style={{ fontWeight: "600" }}>Restaurant Name</label>
          <input
            type="text"
            value={selectedReservation.rv_restaurantname}
            onChange={(e) => handleChange("rv_restaurantname", e.target.value)}
            style={inputStyle}
          />

          <label style={{ fontWeight: "600" }}>Table ID</label>
          <input
            type="number"
            value={selectedReservation.rv_tableid}
            onChange={(e) => handleChange("rv_tableid", Number(e.target.value))}
            style={inputStyle}
          />

          <label style={{ fontWeight: "600" }}>Date</label>
          <input
            type="date"
            value={selectedReservation.rv_date}
            onChange={(e) => handleChange("rv_date", e.target.value)}
            style={inputStyle}
          />

          <label style={{ fontWeight: "600" }}>Time</label>
          <input
            type="time"
            value={selectedReservation.rv_time}
            onChange={(e) => handleChange("rv_time", e.target.value)}
            style={inputStyle}
          />

          <label style={{ fontWeight: "600" }}>Party Size</label>
          <input
            type="number"
            value={selectedReservation.rv_partysize}
            onChange={(e) => handleChange("rv_partysize", Number(e.target.value))}
            style={inputStyle}
          />

          <label style={{ fontWeight: "600" }}>Status</label>
          <select
            value={selectedReservation.rv_status}
            onChange={(e) => handleChange("rv_status", e.target.value)}
            style={inputStyle}
          >
            <option value="Confirmed">Confirmed</option>
            <option value="Canceled">Canceled</option>
          </select>

          <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
            <button onClick={handleUpdate} style={{ ...buttonStyle, width: "50%" }}>
              Update Reservation
            </button>
            <button onClick={handleDelete} style={{ ...buttonStyle, width: "50%", background: "#ff4f4f" }}>
              Delete Reservation
            </button>
          </div>

        </div>
      )}

      {/* Reservations Table */}
          <h2 style={{ marginTop: "40px", marginBottom: "20px" }}>All Reservations</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "white", color: "black" }}>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Restaurant</th>
                <th>Table ID</th>
                <th>Date</th>
                <th>Time</th>
                <th>Party Size</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r) => (
                <tr key={r.rv_id}>
                  <td style={tdStyle}>{r.rv_id}</td>
                  <td style={tdStyle}>{r.rv_customerfirstname}</td>
                  <td style={tdStyle}>{r.rv_customerlastname}</td>
                  <td style={tdStyle}>{r.rv_restaurantname}</td>
                  <td style={tdStyle}>{r.rv_tableid}</td>
                  <td style={tdStyle}>{r.rv_date}</td>
                  <td style={tdStyle}>{r.rv_time}</td>
                  <td style={tdStyle}>{r.rv_partysize}</td>
                  <td style={tdStyle}>{r.rv_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
    </div>
  );
}

const tdStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "8px",
};


const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
  marginBottom: "20px",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "15px",
  background: "#4f7fff",
  color: "white",
  border: "none",
  borderRadius: "10px",
  fontSize: "18px",
  fontWeight: "600",
  cursor: "pointer",
};
