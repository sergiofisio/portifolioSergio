"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_1 = __importDefault(require("../controllers/upload"));
const portifolio_create_1 = __importDefault(require("./../controllers/portifolio/portifolio.create"));
const portifolio_1 = __importDefault(require("./../controllers/portifolio/portifolio"));
const backup_1 = __importDefault(require("./../controllers/backup"));
const node_schedule_1 = __importDefault(require("node-schedule"));
const route = (0, express_1.Router)();
const multer_1 = __importDefault(require("../middleware/multer"));
const portifolio_update_1 = __importDefault(require("./../controllers/portifolio/portifolio.update"));
route.get("/", function (_, res) {
    try {
        res.json({ init: true, message: "Hello World" });
    }
    catch (error) {
        res.status(500).send({ init: false, message: error.message });
    }
});
route.get("/portifolios", portifolio_1.default);
route.get("/backup", backup_1.default);
route.put("/update/:id", portifolio_update_1.default);
route.post("/post", portifolio_create_1.default);
route.post("/upload", multer_1.default.single("file"), upload_1.default);
route.get("/backup", backup_1.default);
node_schedule_1.default.scheduleJob("0 10 * * *", function () {
    (0, backup_1.default)();
});
module.exports = route;
//# sourceMappingURL=router.js.map