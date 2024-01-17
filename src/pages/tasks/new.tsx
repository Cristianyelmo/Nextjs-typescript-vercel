

import { Button, Card,Form,Grid,Confirm } from "semantic-ui-react"
import { ChangeEvent, FormEvent, useState,useEffect } from "react"
import { Task } from "@/interfaces/task";

import {useRouter} from 'next/router'
import Layout from "@/components/Layout";
import { initialize } from "next/dist/server/lib/render-server";


export default function newPage(){



    const [task,setTask] = useState({
        title:"",
        description:""
    }) ;

    const[openConfirm,setOpenConfirm]=useState(false)
    
    const handleChange = ({target:{name,value}}: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>setTask({...task,[name]:value})

const createTask = async(task:Task)=>{
   
   await fetch('https://nextjs-typescript-vercel-gold.vercel.app//api/tasks',{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(task)
   })
}

const router = useRouter()


const loadTask = async (id:string)=>{
   const response = await fetch(`https://nextjs-typescript-vercel-gold.vercel.app//api/tasks/${id}`)
    
   const task = await response.json();
   setTask({title:task.title,description:task.description});
       
}



const updateTask = async(id:string, task:Task)=>{
   
    await fetch(`https://nextjs-typescript-vercel-gold.vercel.app//api/tasks/${id}`,{
     method:'PUT',
     headers:{
         'Content-Type':'application/json'
     },
     body:JSON.stringify(task),
    })
 }


    const handleSubmit = async (e:FormEvent<HTMLFormElement>)=>{
e.preventDefault();
try {
   
if(typeof router.query.id === "string"){
    updateTask(router.query.id,task)
}else{
    createTask(task)
  console.log('upddfdfdfatomg')
}

router.push("/")  
;
   
} catch (error) {
    console.log(error)
}

    }


    const deleteTask = async(id:string)=>{
   
      

        try {
            await fetch(`https://nextjs-typescript-vercel-gold.vercel.app//api/tasks/${id}`,{
                method:'DELETE',
             
               });
               router.push('/'); 
        } catch (error) {
            console.log(error)
        }
     }
    

useEffect(()=>{
    if(typeof router.query.id === "string" ) loadTask(router.query.id)
},[router.query.id])
 
    return (
        <Layout>

<Grid centered columns={3} verticalAlign="middle" style={{height : "70%"}}>
    <Grid.Column>
    <Card>
            <Card.Content>
                <Form onSubmit={handleSubmit}>
                    <Form.Field>
                        <label htmlFor="">Title</label>
                        <input type="text" placeholder="Write you" name="title" onChange={handleChange} value={task.title}/>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="">Description</label>
                        <textarea placeholder="Write you" name="description" rows={2} onChange={handleChange} value={task.description} />
                    </Form.Field>


                    { router.query.id  ?  <Button>Edit </Button> 
                    
                    :  <Button>Save</Button>}
                   
                </Form>
            </Card.Content>
            </Card>  



{router.query.id && <Button color="red" onClick={()=> setOpenConfirm(true)}>borrar  </Button> }


    </Grid.Column>
</Grid>



<Confirm   header="Delete a task" content={`are you sures you want to delete this task ${router.query.id}`}
open={openConfirm}
onCancel={()=> setOpenConfirm(false)}
onConfirm={()=> typeof router.query.id === 'string' && deleteTask(router.query.id )}  />


            
        </Layout>
    )
}