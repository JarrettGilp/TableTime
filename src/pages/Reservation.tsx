import { useState } from "react";
import { Link } from "react-router-dom";

export default function Reservation() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);

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

      
      <label style={{ fontWeight: "600" }}>Your Name</label>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
          marginBottom: "20px",
        }}
      />

      
      <label style={{ fontWeight: "600" }}>Email</label>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
          marginBottom: "20px",
        }}
      />

     
      <input
        type="text"
        placeholder="Search restaurants..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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
      >
        Confirm Reservation
      </button>
    </div>
  );
}
