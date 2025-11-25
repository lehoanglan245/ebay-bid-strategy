import { useState } from "react";
import axios from "axios";

function App() {
  const [keyword, setKeyword] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [result, setResult] = useState(null);

  const handleGenerate = async () => {
    try {
      const res = await axios.post("http://localhost:4000/strategy", {
        keyword,
        maxBudget: Number(maxBudget),
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Lỗi khi gọi API!");
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "500px", margin: "auto" }}>
      <h1>eBay Bidding Strategy Tool</h1>

      <label>Keyword (search on eBay):</label>
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="iphone 13"
        style={{ width: "100%", padding: "10px", marginTop: "8px" }}
      />

      <br /><br />

      <label>Max Budget ($):</label>
      <input
        value={maxBudget}
        onChange={(e) => setMaxBudget(e.target.value)}
        type="number"
        placeholder="300"
        style={{ width: "100%", padding: "10px" }}
      />

      <br /><br />

      <button
        onClick={handleGenerate}
        style={{
          padding: "12px 20px",
          backgroundColor: "black",
          color: "white",
          cursor: "pointer",
          width: "100%"
        }}
      >
        Generate Strategy
      </button>

      {result && (
        <div style={{ marginTop: "30px", padding: "20px", border: "1px solid #ddd" }}>
          <h3>Strategy Result</h3>
          <p><b>Avg End Price:</b> {result.avgEndPrice}</p>
          <p><b>Suggested Bid:</b> {result.suggestedBid}</p>
          <p><b>Message:</b> {result.message}</p>
        </div>
      )}
    </div>
  );
}

export default App;
