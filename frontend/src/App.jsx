import { useState } from "react";
import axios from "axios";

function App() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const createRide = async () => {
    if (!from || !to) {
      alert("Please enter both From and To locations");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/rides/create",
        {
          from,
          to,
        }
      );

      console.log(response.data);
      alert("Ride Created Successfully 🚗");

      // clear inputs after submit
      setFrom("");
      setTo("");
    } catch (error) {
      console.error(error);
      alert("Error creating ride ❌");
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>🚗 Intercity Cab</h1>

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="From (e.g. Delhi)"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          style={{ padding: "10px", width: "200px" }}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="To (e.g. Jaipur)"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          style={{ padding: "10px", width: "200px" }}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={createRide}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            backgroundColor: "black",
            color: "white",
            border: "none",
          }}
        >
          Create Ride
        </button>
      </div>
    </div>
  );
}

export default App;