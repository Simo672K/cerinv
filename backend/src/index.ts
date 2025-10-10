import express from "express";
import router from "./routes";

const app = express();
const BASE_API_ROUTE_V1 = "/api/v1";

app.use(express.json());
app.use(BASE_API_ROUTE_V1, router);

app.listen(3000, () => {
  console.log("[*] 🚀 server running on port 3000...");
});
