import cors from "cors";
import express from "express";
import "dotenv/config";
import siteUrls from "./src/routes/index.js"


const app = express();
const port = process.env.PORT;

app.use(express.json())
app.use(cors())

app.use("/",siteUrls)

app.listen(port,() => {
    console.log(`Server open on http://localhost:${port}`);
})
