import { NextApiRequest, NextApiResponse } from "next"
import {conn} from '../../../utils/database'
import { sql } from '@vercel/postgres';
export default async (req:NextApiRequest,res:NextApiResponse) =>{
    console.log(req.query)
  
const {method,query,body} = req


    switch (method) {
        case 'GET':
try {
    const text = 'SELECT * FROM tasks WHERE id = $1'
const values = [query.id];
const result = await conn.query(text,values)
console.log(result)


if(result.rows.length === 0)
return res.status(404).json({message:"task not founs"})





            return res.status(200).json(result.rows[0])

    
} catch (error:any) {
    return res.status(500).json({ message:error.message});
}






           
    case 'POST':
        return res.status(200).json('creating taks');
       case 'DELETE':
        try {

           
            const result = await sql`DELETE FROM tasks WHERE id = ${typeof query.id === 'number' && query.id } RETURNING *`;
        



       
        
        
        
        if(result.rowCount === 0)
        return res.status(404).json({message:"task not founs"})
        
        
        
        
        
                    return res.status(200).json(result.rows[0])
        
            
        } catch (error:any) {
            return res.status(500).json({ message:error.message});
        }
        case 'PUT':

            try {
                const {title,description} = body
                const result = await sql`UPDATE tasks SET title = ${title},description = ${description} WHERE id = ${typeof query.id === 'number' && query.id} RETURNING * `;
            
            
            
            if(result.rows.length === 0)
            return res.status(404).json({message:"task not founs"})
            
            
            
            
            
                        return res.status(200).json(result.rows[0])
            
                
            } catch (error:any) {
                return res.status(500).json({ message:error.message});
            }
        default:
            return res.status(400).json('invalid method');
            break;
    }
}