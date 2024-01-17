
import { Router, useRouter } from "next/router"

import { Button, Menu,Image,Container } from "semantic-ui-react"



export default function NavBar(){
    const router = useRouter();
    return(
      <Menu>
<Container>
    <Menu.Item>
        <Image src="https://react.semantic-ui.com/logo.png" width={30} height={38} />
    </Menu.Item>


<Menu.Menu position='right'>
    <Menu.Item>
        <Button onClick={()=> router.push('/tasks/new')}>
            NEW tASK
        </Button>
    </Menu.Item>
</Menu.Menu>




</Container>


      </Menu>
    )
}