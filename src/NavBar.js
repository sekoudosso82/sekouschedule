import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import UserController from './todos/UserController';


function NavBar(props){
    console.log('**************** nav bar currentUser********', props.currentUser)

  return (
   <div className="  fixed-top navbar" >
   
          
            <Link to="/">
                <div className="navCLass " >Home</div>
            </Link>
          
            <Link to="/complete">
                <div className="navCLass " >Completed Tasks</div>
            </Link>
                
                <div className="navCLass"> 
                <UserController  logout={props.logout} currentUser={props.currentUser} /> </div>

          
      </div>
      
  )
}
export default NavBar
