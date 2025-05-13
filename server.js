const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5001;  // Ensure this matches your CURL request

app.use(cors());
app.use(express.json());

app.post("/api/ask", (req, res) => {
    console.log("Received request:", req.body);
    res.json({ answer: "Your response here" });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server running on port ${PORT}`);
});


