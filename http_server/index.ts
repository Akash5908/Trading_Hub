import express from "express";
import users from "./src/routes/users.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", users);
app.get("/api/v2", () => {
  console.log("jeesfdsf");
});

function startServer() {
  app.listen(3000, () => {
    console.log("Server started at port 3000!!!");
  });
}

startServer();
