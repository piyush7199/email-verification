import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import EmailRoute from "./routes/emailRoute.js";

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();

const port = process.env.PORT;

app.get("/health", (req, res) => {
  res.sendStatus(200);
});

app.use("/api/email", EmailRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
