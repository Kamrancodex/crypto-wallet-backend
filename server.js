const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const cors = require("cors");
app.use(cors());
var corsOptions = {
  origin: "http://localhost:5173/",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const walletRoutes = require("./routes/wallet");

app.get("/", (req, res) => {
  res.send("hello web3");
});

app.use("/api", walletRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
