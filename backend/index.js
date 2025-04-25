const express = require("express");
const connection = require("./config/db");
const blogRouter = require("./routes/routes");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({
  origin:"http://localhost:5173"
}));
app.use("/api/blogs", blogRouter);

app.listen(process.env.PORT || 8080, async () => {
  try {
    await connection;
    console.log("moongose server is connected");
    console.log(" server is running");
  } catch (error) {
    console.log(" server is not connected");
  }
});
