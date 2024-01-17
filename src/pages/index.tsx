import { Button, Grid } from 'semantic-ui-react'
import {Task} from '../interfaces/task'
import {useRouter} from 'next/router'
import { TaskList } from '@/components/tasks/TaskList'
import Layout from '@/components/Layout'
interface Props {
  tasks:any[]
}



export default function index({tasks}:Props) {
  const router = useRouter()
  return <Layout>{tasks.length === 0 ? (
  <Grid columns={3} centered verticalAlign='middle' style={{height : '70%'}}>
    <Grid.Row>
      <Grid.Column>
        <h1>No tasks yet</h1>
        <Button onClick={()=> router.push('tasks/new')}>Create one</Button>
      </Grid.Column>
    </Grid.Row>
  </Grid>
  
  
  ) :( 


<TaskList tasks={tasks} />


  )}</Layout>

}


export const getServerSideProps = async ()=>{

const res = await fetch('http://localhost:3000/api/tasks')

const tasks = await res.json()



  return {
    props:{
     tasks:tasks
    }
  }
}
