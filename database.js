import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

export async function guardarRegistro(registro){
    const  result  = await pool.query(`
        INSERT INTO Jugadores (nombre, puntaje)
        VALUES (${registro.nombreUsuario}, ${registro.puntaje})`)

        console.log(`Guardado el nombre ${registro.nombreUsuario} con el puntaje ${registro.puntaje}`);
}

export async function obtenerRegistros(){
    const  result  = await pool.query(`
        SELECT *
        FROM Jugadores
        ORDER BY id DESC`);

        console.log("obtenerRegistros() devolvió: ", result.rows);
        return result.rows;

}

export async function sacarTop10(){
    const  result  = await pool.query(`
        SELECT  *
        FROM Jugadores
        ORDER BY puntaje DESC`)    

        console.log("SacarTop10() devolvió: ", result.rows);
        return result.rows.slice(0, 9);
}