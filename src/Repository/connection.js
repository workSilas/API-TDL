import mysql from "mysql2/promise"

const con = await mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PWD,
    database: process.env.BD
})


console.log('--> A conexão foi estabelecida. <--')
export default con;