import express from "express";
import { home, agregarUser, mostrarUsers, eliminarUser, editarUser, transferir, mostrarTransf} from "../controllers/controllers.js";

const router = express.Router();

router.get("/", home)

router.post("/usuario", agregarUser)

router.get("/usuarios", mostrarUsers)

router.delete("/usuario", eliminarUser)

router.put("/usuario", editarUser)

router.post("/transferencia", transferir)

router.get("/transferencias", mostrarTransf)

router.get("*", (req, res) => {
    res.send("No se encontro la ruta");
})


export default router;