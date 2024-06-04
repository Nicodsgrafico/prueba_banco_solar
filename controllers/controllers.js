import path from "path";
import { agregarUsuario , mostrarUsuarios, eliminarUsuario, editarUsuario} from "../models/queries.js";

const __dirname = path.resolve();

export const home = (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
};

export const agregarUser = async (req, res) => {
    const { nombre, balance } = req.body;
    console.log(nombre, balance);
    const response = await agregarUsuario(nombre, balance);
    res.send(response);
}

export const mostrarUsers = async (req, res) => {
    const response = await mostrarUsuarios();
    res.send(response);
}

export const eliminarUser = async (req, res) => {
    const { id } = req.query;
    const response = await eliminarUsuario(id);
    res.send(response);
}

export const editarUser = async (req, res) => {
    const { id } = req.query;
    const { nombre, balance } = req.body;
    const response = await editarUsuario(nombre, balance, id);
    res.send(response);
}