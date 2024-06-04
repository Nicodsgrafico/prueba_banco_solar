import express from "express";
import { home, agregarUser, mostrarUsers, editarUser, eliminarUser } from "../controllers/controllers.js";

const router = express.Router();

router.get("/", home);

router.post("/usuario", agregarUser);

router.get("/usuarios", mostrarUsers);

router.put("/usuario/:id", editarUser);

router.delete("/usuario/:id", eliminarUser);

router.get("*", (req, res) => {
    res.send("No se encontro la ruta");
})


export default router;