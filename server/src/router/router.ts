import { Router } from "express";
import uploadFile from "../controllers/upload";
import portifolio from "./../controllers/portifolio/portifolio.create";
import allPortifolios from "./../controllers/portifolio/portifolio";
import backup from "./../controllers/backup";

const route = Router();

const multer = require("../middleware/multer");

route.get("/", function (_, res) {
  try {
    res.json({ message: "Hello World" });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
});

route.get("/portifolios", allPortifolios);
route.get("/backup", backup);
// route.post("/post", portifolio);
route.post("/upload", multer.single("file"), uploadFile);

module.exports = route;
