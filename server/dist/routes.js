"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const allRoutes = express();
allRoutes.use(express.json());
allRoutes.use((req, _, next) => {
    const url = req.protocol + "://" + req.get("host") + req.originalUrl;
    console.log("url: ", url);
    console.log("metodo: ", req.method);
    next();
});
allRoutes.use(require("./router/router"));
module.exports = allRoutes;
//# sourceMappingURL=routes.js.map