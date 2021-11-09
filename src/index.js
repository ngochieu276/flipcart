const express = require("express");
const env = require("dotenv");
const app = express();
const path = require("path");
const cors = require("cors");

const mongoose = require("mongoose");

// routes

const adminRoutes = require("./routes/admin/auth");
const userRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const adminOrderRoutes = require("./routes/admin/order");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const initialDataRoutes = require("./routes/admin/initialData");
const addressRoutes = require("./routes/address");
const pageRoutes = require("./routes/admin/page");
const orderRoutes = require("./routes/order");

// enviroment variable or you can say constant
env.config();

// mongodb connection

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.yrym9.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,

    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log(`Database connected ${process.env.PORT}`);
  });
app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api/admin", adminRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", initialDataRoutes);
app.use("/api", pageRoutes);
app.use("/api", addressRoutes);
app.use("/api", orderRoutes);
app.use("/api", adminOrderRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
