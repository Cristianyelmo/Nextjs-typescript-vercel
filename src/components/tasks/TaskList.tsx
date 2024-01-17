import { Task } from '@/interfaces/task'
import { useRouter } from 'next/router'
import React from 'react'
import { Card } from 'semantic-ui-react'
interface Props{
    tasks:Task[]
}
export function TaskList({tasks}:Props){

const router = useRouter()

    return <Card.Group itemsPerRow={4} >

{tasks.map(task =>(
<Card key={task.id} onClick={()=> router.push(`/tasks/edit/${task.id}`)}>
    <Card.Content>
        <Card.Header>
            {task.title}
        </Card.Header>

        <Card.Description>
            {task.description}
        </Card.Description>
    </Card.Content>
</Card>
))}



</Card.Group>




    
}