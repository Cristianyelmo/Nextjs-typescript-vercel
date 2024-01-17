import { NextApiRequest, NextApiResponse } from "next"
/* import {conn} from '../../../utils/database' */
import { sql } from '@vercel/postgres';
export default async (req:NextApiRequest,res:NextApiResponse)=>{

  const {method,body} = req;

  

switch (method) {
    case 'GET':

try {
  const query = await sql`SELECT * FROM tasks`;
/* const response = await conn.query(query); */

console.log(query);
        return res.status(200).json(query.rows)
} catch (error) {
  console.log(error)
}
       
case 'POST':
 

    default:
        return res.status(400).json('invalid method');
        break;
}


  
}






