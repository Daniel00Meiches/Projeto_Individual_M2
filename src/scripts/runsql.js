const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const useSSL = process.env.DB_SSL === 'true';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: useSSL ? { rejectUnauthorized: false } : false,
});

const runSQLScript = async (fileName) => {
  const filePath = path.join(__dirname, fileName);
  const sql = fs.readFileSync(filePath, 'utf8');

  try {
    await pool.query(sql);
    console.log(`Arquivo ${fileName} executado com sucesso!`);
  } catch (err) {
    console.error(`Erro ao executar ${fileName}:`, err);
  }
};

const run = async () => {
  await runSQLScript('init.sql');
  await runSQLScript('exemplo.sql');
  await pool.end();
};

run();