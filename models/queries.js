import { pool } from "../config/db.js";

//Consultas a la base de datos
const agregarUsuario = async (nombre, balance) => {
    try {
        const sql = {
            text: "INSERT INTO usuarios (nombre, balance) VALUES ($1, $2) RETURNING *",
            values: [nombre, balance]
        }
        const response = await pool.query(sql);
        if (response.rowCount > 0) {
            return response.rows[0];
        } else {
            return throwError("No se pudo agregar el usuario");
            console.log(`Usuario: ${res.rowCount} agregada con exito`);
        }
    } catch (error) {
        console.error("Error al agregar el usuario: ", error);
        throw error;
    }
}

const mostrarUsuarios = async () => {
    try {
        const sql ={
            text: "SELECT * FROM usuarios"
        }
        const response = await pool.query(sql);
        if (response.rowCount > 0) {
            return response.rows;
        } else {
            return throwError("No se encontraron usuarios");
        }
    } catch (error) {
        console.error("Error al mostrar los usuarios: ", error);
        throw error;
    }
}
const eliminarUsuario = async (id) => {
    try {
        const sql = {
            text: "DELETE FROM usuarios WHERE id = $1",
            values: [id]
        }
        const response = await pool.query(sql);
        if (response.rowCount > 0) {
            return response.rows[0];
        } else {
            return throwError("No se pudo eliminar el usuario");
        }
    } catch (error) {
        console.error("Error al eliminar el usuario: ", error);
        throw error;
    }
}

const editarUsuario = async (nombre, balance, id) => {
    try {
        const sql = {
            text: "UPDATE usuarios SET nombre = $1, balance = $2 WHERE id = $3",
            values: [nombre, balance, id]
        }
        const response = await pool.query(sql);
        if (response.rowCount > 0) {
            return response.rows[0];
        } else {
            return throwError("No se pudo editar el usuario");
        }
    } catch (error) {
        console.error("Error al editar el usuario: ", error);
        throw error;
    }
}

const throwError = (message) => {
    throw new Error(message);
}

export { agregarUsuario, mostrarUsuarios, eliminarUsuario, editarUsuario }