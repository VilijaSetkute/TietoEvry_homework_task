const express = require("express");
require("dotenv").config();
const app = express();
const mainRoute = require("./routes/mainRoute");
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");

app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use("/", mainRoute);

server.listen(process.env.PORT, () => {
    console.log(`Server is listening to port ${process.env.PORT}`);
});

