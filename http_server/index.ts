import express from "express";
import users from "./src/routes/users.js";
import trade from "./src/routes/trade.js";
import cors from "cors";
import StoreTrade from "./src/lib/poller.js";

const app = express();

const port = 5001;

app.use(cors());
app.use(express.json());

app.use("/api/v1", users);
app.use("/api/v1/trade", trade);
app.get("/api/v2", () => {
  console.log("jeesfdsf");
});

function startServer() {
  app.listen(port, () => {
    console.log(`Server started at port ${port}!!! `);
  });
}

StoreTrade();
startServer();
