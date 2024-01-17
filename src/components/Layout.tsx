import NavBar from "./Navbar";
import React, { ReactNode } from "react";
interface LayoutProps {
    children: ReactNode;
  }
export default function Layout({ children }: LayoutProps){
    return(
        <div>

       <NavBar/>
{children}




        </div>
    )
}