const express = require("express");
const cors = require("cors");
const { mockListings } = require("./mockData");

const app = express();

app.use(cors());
app.use(express.json());

// Test API
app.get("/ping", (req, res) => {
  res.json({ message: "Server is running!" });
});

// ====== HÀM TÍNH CHIẾN LƯỢC ======
function computeStrategy(maxBudget) {
  const avgEndPrice =
    mockListings.reduce((sum, item) => sum + item.endPrice, 0) /
    mockListings.length;

  const suggestedBid = Math.min(avgEndPrice * 0.9, maxBudget);

  return {
    avgEndPrice,
    suggestedBid,
    message: "Gợi ý dựa trên giá kết thúc trung bình (baseline)."
  };
}

// ====== API POST /strategy ======
app.post("/strategy", (req, res) => {
  const { maxBudget } = req.body;

  if (!maxBudget) {
    return res.status(400).json({ error: "Thiếu maxBudget!" });
  }

  const result = computeStrategy(Number(maxBudget));
  res.json(result);
});

app.listen(4000, () => {
  console.log("Backend running at http://localhost:4000");
});
