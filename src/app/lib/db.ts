import { Pool } from 'pg'

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432
});

interface Station {
  id: number
  category: string
  medianame: string
  stream: string
  website: string
  frequency: string
  location: string
  type: string
  hits: string
  approved: string
  priority: number
  courtesy: string
  courtesylink: string
  medianameshort: string
}

export async function query(text: string, params?: unknown[]): Promise<Station[]> {
  const result=await pool.query(text, params);
  return result.rows
}
