const express = require("express");
require("dotenv").config();
const app = express();
const mainRoute = require('./routes/mainRoute');
const http = require('http')
const server = http.createServer(app)
const cors = require('cors')

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.setHeader(
//         "Access-Control-Allow-Methods",
//         "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//     );
//     res.setHeader(
//         "Access-Control-Allow-Headers",
//         "X-Requested-With,content-type,Origin"
//     );
//     res.setHeader("Access-Control-Allow-Credentials", true);
//     next();
// });

app.use(cors({origin: true, credentials: true}))
app.use(express.json());
app.use('/', mainRoute);

server.listen(process.env.PORT, () => {
    console.log(`Server is listening to port ${process.env.PORT}`)
});

