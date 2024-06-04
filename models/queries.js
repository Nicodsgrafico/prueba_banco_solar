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
            return new Error("No existen registros")
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

export const addTransferencia = async (emisor, receptor, monto) => {
    
    const {id : emisorId} = (await pool.query({
        text: "SELECT id FROM usuarios WHERE nombre = $1",
        values: [emisor]
    })).rows[0];
    
    const {id : receptorId} = (await pool.query({
        text: "SELECT id FROM usuarios WHERE nombre = $1",
        values: [receptor]
    })).rows[0];
    
    const addTransfer = {
        text: "INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES ($1, $2, $3, NOW()) RETURNING *",
        values: [emisorId, receptorId, monto]
    }
    const updateEmisor = {
        text: "UPDATE usuarios SET balance = balance - $1 WHERE id = $2 RETURNING *",
        values: [monto, emisorId]
    }
    const updateReceptor = {
        text: "UPDATE usuarios SET balance = balance + $1 WHERE id = $2 RETURNING *",
        values: [monto, receptorId]
    }

    try {
        await pool.query("BEGIN");
        await pool.query(addTransfer);
        await pool.query(updateEmisor); 
        await pool.query(updateReceptor);
        await pool.query("COMMIT");
        console.log("Transferencia agregada con exito");
    } catch (error) {
       await pool.query("ROLLBACK");
       console.error("Error al agregar la transferencia: ", error);
       throw error;
    }
}

export const showTransferencias = async () => {
    try {
        const sql = {
            text: "SELECT t.fecha, e.nombre AS emisor, r.nombre AS receptor, t.monto FROM transferencias t JOIN usuarios e ON t.emisor = e.id JOIN usuarios r ON t.receptor = r.id ORDER BY t.fecha DESC",
            rowMode: 'array'
        };
        const response = await pool.query(sql)
        if (response.rowCount > 0) {
            return response.rows
        } else {
            return new Error("No existen registros")
        }
    } catch (error) {
        console.log("Error code: ", error.code, "Error message: ", error.message);
    }
}

export { agregarUsuario, mostrarUsuarios, eliminarUsuario, editarUsuario }