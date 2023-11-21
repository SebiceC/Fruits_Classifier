import express from "express";

import {
  obtener,
  
} from "../controllers/Controller.js";

const router = express.Router();

// Ruta para obtener todos los productos
router.get("/show", obtener);

export default router;
