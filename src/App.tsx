import { Routes, Route, Link } from "react-router-dom";
import Reservation from "./pages/Reservation";

export default function App() {
  return (
    <Routes>

      {/* HOME PAGE */}
      <Route
        path="/"
        element={
          <div
            style={{
              padding: "40px",
              maxWidth: "600px",
              lineHeight: "1.6",
            }}
          >
            <h1
              style={{
                fontSize: "2.5rem",
                marginBottom: "20px",
                fontWeight: "700",
              }}
            >
              Table Time
            </h1>

            <p style={{ marginBottom: "30px", opacity: 0.9 }}>
              TableTime brings the entire dining experience together in one smooth,
              easy platform.
              <br /><br />
              Discover new restaurants, browse real-time table availability, and
              book your spot in seconds.
              <br /><br />
              For restaurants, TableTime offers a powerful management dashboard
              that keeps reservations organized and operations running effortlessly.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <Link to="/reservation">
                <button style={buttonStyle}>Make a Reservation</button>
              </Link>

              <button style={buttonStyle}>Login as Admin</button>
              <button style={buttonStyle}>Manage Reservation</button>
            </div>
          </div>
        }
      />

      {/* RESERVATION PAGE */}
      <Route path="/reservation" element={<Reservation />} />

    </Routes>
  );
}

const buttonStyle = {
  padding: "12px 20px",
  borderRadius: "10px",
  background: "#4f7fff",
  color: "white",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "600",
};
