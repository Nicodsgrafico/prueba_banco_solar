import express from "express";
import router from "./routes/router.js";

//Variables
const app = express();
const PORT = process.env.PORT || 3000;


//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Rutas
app.use("/", router);

//Puerto
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));