import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Reservation() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [tableID, setTableID] = useState<number>(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);

  const [reservations, setReservations] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/reservations")
      .then((res) => res.json())
      .then((data) => setReservations(data))
      .catch((err) => console.error(err));
  }, []);

  const handleConfirmReservation = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          restaurantName,
          tableID,
          date,
          time,
          partySize: guests,
        }),
      });

      if (!response.ok) throw new Error("Failed to create reservation");

      const newReservation = await response.json();
      setReservations([newReservation, ...reservations]);

      // Clear the form
      setFirstName("");
      setLastName("");
      setRestaurantName("");
      setTableID(0);
      setDate("");
      setTime("");
      setGuests(2);

      alert("Reservation confirmed!");
    } catch (err) {
      console.error(err);
      alert("Error creating reservation");
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "600px",
        margin: "0 auto",
        lineHeight: "1.6",
      }}
    >
      
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
        Make a Reservation
      </h1>

      
      <label style={{ fontWeight: "600" }}>Your First Name</label>
      <input
        type="text"
        placeholder="Enter your first name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
          marginBottom: "20px",
        }}
      />

      <label style={{ fontWeight: "600" }}>Your Last Name</label>
      <input
        type="text"
        placeholder="Enter your last name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
          marginBottom: "20px",
        }}
      />
     
      <label style={{ fontWeight: "600" }}>Restaurant Name</label>
      <input
        type="text"
        placeholder="Search restaurants..."
        value={restaurantName}
        onChange={(e) => setRestaurantName(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
          marginBottom: "20px",
        }}
      />

      <label style={{ fontWeight: "600" }}>Table ID</label>
      <input
        type="number"
        placeholder="Enter table ID..."
        value={tableID}
        onChange={(e) => setTableID(Number(e.target.value))} // convert string to number
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
          marginBottom: "20px",
        }}
      />

      {/* DATE */}
      <label style={{ fontWeight: "600" }}>Select Date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
          marginBottom: "20px",
        }}
      />

      {/* TIME */}
      <label style={{ fontWeight: "600" }}>Select Time</label>
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
          marginBottom: "20px",
        }}
      />

      
      <label style={{ fontWeight: "600" }}>Number of Guests</label>
      <select
        value={guests}
        onChange={(e) => setGuests(Number(e.target.value))}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
          marginBottom: "30px",
        }}
      >
        {[1,2,3,4,5,6,7,8,9,10].map((n) => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>

      
      <button
        style={{
          width: "100%",
          padding: "15px",
          background: "#4f7fff",
          color: "white",
          border: "none",
          borderRadius: "10px",
          fontSize: "18px",
          fontWeight: "600",
          cursor: "pointer",
        }}
        onClick={handleConfirmReservation}
      >
        Confirm Reservation
      </button>

      {/* Reservations Table */}
      <h2 style={{ marginBottom: "20px" }}>All Reservations</h2>
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
  padding: "8px"
};

