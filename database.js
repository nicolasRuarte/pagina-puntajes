import mysql, { createPool } from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

export async function guardarDatos(datos){
    const [ result ] = await pool.query(`
        INSERT INTO Jugadores (nombre, puntaje)
        VALUES (?, ?)`, [datos.nombre, datos.puntaje])
}