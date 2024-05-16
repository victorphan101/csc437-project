// src/index.ts
import express, { Request, Response } from "express";
import players from "./routes/players";
import { connect } from "./services/mongo";

connect("sports");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";


app.use(express.static(staticDir));
app.use(express.json());


app.use("/api/players", players);


app.get("/hello", (_: Request, res: Response) => {
  res.send(
    `<h1>Hello!</h1>
     <p>Server is up and running.</p>
     <p>Serving static files from <code>${staticDir}</code>.</p>
    `
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});