const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.routes");
const hotelRoutes = require("./routes/hotel.routes");
const bookingRoutes = require("./routes/booking.routes");
const travelRoutes = require("./routes/travel.routes");
const connectDb = require("./config/db");
connectDb()
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/travel", travelRoutes);

app.listen(5000, () => {
    console.log("App started successfully");
})