import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/connectDB.js";
import userRouter from "./route/user.route.js";
import categoryRouter from "./route/category.route.js";
import uploadRouter from "./route/upload.route.js";
import subCategoryRouter from "./route/subCategory.route.js";
import productRouter from "./route/product.route.js";
import cartRouter from "./route/cart.route.js";
import addressRouter from "./route/address.route.js";
import orderRouter from "./route/order.route.js";

dotenv.config();
const app = express();

//Middlewares
app.use(
  cors({
    credentials: true, //allow the frontend to send cookies, authorization headers, or TLS client certificates to the backend
    origin: process.env.FRONTEND_URL, //This is where you specify which frontend URL is allowed to access your backend
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

//Adding some routes for checking purpose whether server is running in the browser
// app.get("/api/test", (request, response) => {
//   //server to client
//   response.json({
//     message: "Server is running",
//   });
// });

//Start Server
const PORT = process.env.PORT || 5500;

// TEST route
app.get("/", (req, res) => {
  res.json({
    message: "Server is runnig " + PORT,
  });
});

app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/file", uploadRouter);
app.use("/api/subcategory", subCategoryRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running", PORT);
  });
});
