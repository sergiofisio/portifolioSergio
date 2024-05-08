import { Router } from "express";
import uploadFile from "../controllers/upload";

const route = Router();

const multer = require("../middleware/multer");

route.get("/", function (_, res) {
  try {
    res.json({ message: "Hello World" });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
});

route.post("/upload", multer.single("file"), uploadFile);

module.exports = route;
