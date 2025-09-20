import { Pool } from 'pg'

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432
});

export async function query(text:string,params?:any[]){
  const result=await pool.query(text, params);
  return result.rows
}
