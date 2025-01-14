"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const allRoutes = require("./routes");
const app = express();
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
}));
app.use(express.json());
app.use(allRoutes);
app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
});
//# sourceMappingURL=index.js.map