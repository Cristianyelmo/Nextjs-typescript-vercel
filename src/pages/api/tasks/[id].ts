import { NextApiRequest, NextApiResponse } from "next"
import {conn} from '../../../utils/database'

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
            const text = 'DELETE FROM tasks WHERE id = $1 RETURNING *'
        const values = [query.id];
        const result = await conn.query(text,values)
        console.log(result)
        
        
        if(result.rows.rowCount === 0)
        return res.status(404).json({message:"task not founs"})
        
        
        
        
        
                    return res.status(200).json(result.rows[0])
        
            
        } catch (error:any) {
            return res.status(500).json({ message:error.message});
        }
        case 'PUT':

            try {
                const {title,description} = body
                const text = 'UPDATE tasks SET title = $1,description = $2 WHERE id = $3 RETURNING * '
            const values = [title,description,query.id];
            const result = await conn.query(text,values)
            console.log(result)
            
            
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