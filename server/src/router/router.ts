import { Router } from "express";
import uploadFile from "../controllers/upload";
import portifolio from "./../controllers/portifolio/portifolio.create";
import allPortifolios from "./../controllers/portifolio/portifolio";
import backup from "./../controllers/backup";
import schedule from "node-schedule";

const route = Router();

import multerInstance from "../middleware/multer";
import updatePortifolio from "./../controllers/portifolio/portifolio.update";

route.get("/", function (_, res) {
  try {
    res.json({init:true, message: "Hello World" });
  } catch (error: any) {
    res.status(500).send({init:false, message: error.message });
  }
});

route.get("/portifolios", allPortifolios);
route.get("/backup", backup);
route.put("/update/:id", updatePortifolio);
route.post("/post", portifolio);
route.post("/upload", multerInstance.single("file"), uploadFile);
route.get("/backup", backup);

schedule.scheduleJob("0 10 * * *", function () {
  backup();
});

module.exports = route;
