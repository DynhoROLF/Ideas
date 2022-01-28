const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);


/**
 * Métodos HTTP: 
 * 
 * GET: Buscar/Listar Informações do back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end
 * DELETE: ...  * 
 */

/**
 * Tipos de Parâmetros: 
 * 
 * Query Params: Parâmetros nomeados enviados na rota após "?" (filtros, paginação)"
 * Route Params: Parâmetros utilizados para identificar recursos
 * Request Body: Corpo da requisição, utilizado para criar ou alterar
 */

/**
 * SQL: MySQL, SQLite, PostgreSQL, Oracle
 * NoSQL: MongoDB, CouchDB
 * Driver: SELECT * FROM users
 * Query Builder: table('users').select('*').where()
 */