import mysql, { createPool } from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

export async function guardarRegistro(registro){
    const [ result ] = await pool.query(`
        INSERT INTO Jugadores (nombre, puntaje)
        VALUES (?, ?)`, [registro.nombreUsuario, registro.puntaje])

        console.log(`Guardado el nombre ${registro.nombreUsuario} con el puntaje ${registro.puntaje}`);
}

export async function obtenerRegistros(){
    const [ result ] = await pool.query(`
        SELECT *
        FROM Jugadores
        ORDER BY id DESC`);

        return result;
}

//Si devuelve true el usuario ya existe. Caso contrario está disponible
/* export async function usuarioExiste(nombre){
    const [ result ] = await pool.query(`
        SELECT *
        FROM Jugadores
        WHERE nombre = ?`, [nombre]);
    
    return {usuarioExiste: result != {}};
} */


export async function sacarTop10(){
    const [ result ] = await pool.query(`
        SELECT  *
        FROM Jugadores
        ORDER BY puntaje DESC`)    

        console.log("SacarTop10() devolvió: ", result);
        return result.slice(0, 9);
}