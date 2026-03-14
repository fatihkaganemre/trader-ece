import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import dotenv from "dotenv";
import contactRoutes from "./routes/contact.js";

// import session from "express-session";
// import passport from "passport";

const app = express();
const PORT = process.env.PORT || 5060;
// const allowedOrigins = [
//   'http://localhost:3000',
//   'https://trader-ece.com',
//   'http://localhost:5173', // add this
//   'https://www.trader-ece.com'
// ];
dotenv.config();

// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin) return callback(null, true); // allow Postman / server requests
//     if (allowedOrigins.includes(origin) || /^https:\/\/([a-z0-9-]+\.)?trader-ece\.com$/.test(origin)) {
//       return callback(null, true);
//     }
//     return callback(new Error("Not allowed by CORS"));
//   },
//   credentials: true,
// }));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // <--- needed for passport-local
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   cookie: { httpOnly: true, secure: process.env.NODE_ENV === "production" }
// }));
// app.use(passport.initialize());
// app.use(passport.session());

app.use("/api/contact", contactRoutes);
app.get("/", (req, res) => {
  res.send("Backend is live");
});

if (process.env.NODE_ENV === "development") {
   app.listen(PORT, () => { console.log(`Server running at http://localhost:${PORT}`) });
}

export const handler = serverless(app);
export default app;