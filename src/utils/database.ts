import {Pool} from 'pg'

let conn: any


if(!conn){
    conn = new Pool({
        user:'postgres',
        password:'123pelotudo',
        host:'localhost',
        port:5432,
        database:'taskdb'
    })
}


export {conn};