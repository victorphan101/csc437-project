// src/index.ts
import express, { Request, Response } from "express";
import players from "./routes/players";
import path from "path";
import { connect } from "./services/mongo";
import auth, { authenticateUser } from "./routes/auth";
import fs from "node:fs/promises";

connect("sports");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";


app.use(express.static(staticDir));
app.use(express.json());
app.use("/auth", auth);

app.use("/api/players", authenticateUser, players);


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

// SPA Routes: /app/...
app.use("/app", (req: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
    res.send(html)
  );
});

const nodeModules = path.resolve(
  __dirname,
  "../../../node_modules"
);
console.log("Serving NPM packages from", nodeModules);
app.use("/node_modules", express.static(nodeModules));