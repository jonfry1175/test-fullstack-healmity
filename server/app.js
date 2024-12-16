const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

const router = require("./routes");
app.use("/api", router);

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});