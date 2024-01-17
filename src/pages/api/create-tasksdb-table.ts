import { NextApiRequest, NextApiResponse } from 'next';
import { sql,db } from '@vercel/postgres';
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
)

 {
 
  try {
   
      await sql`CREATE TABLE IF NOT EXISTS tasks(
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description VARCHAR(200),
        created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    
    );`;

const task = ['titulo','deaa']


   

await sql`INSERT INTO tasks(title,description) VALUES (${task[0]},${task[1]});`
    
    
       






const result = await sql`SELECT * FROM tasks;`;




    return response.status(200).json({ result });
  } catch (error) {
    return response.status(500).json({ error });
  }
}