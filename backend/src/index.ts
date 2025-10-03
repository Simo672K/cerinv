import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello there!");
});

app.listen(3000, () => {
  console.log("[*] 🚀 server running on port 3000...");
});
