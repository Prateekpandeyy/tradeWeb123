import React from 'react';
import logoImg from '../../images/PngImages/logo.png';
import documentImg from '../../images/PngImages/document.png';
import homeImg from '../../images/PngImages/home.png';
import bookImg from '../../images/PngImages/book.png';
import arrowImg from '../../images/PngImages/arrow.png';
import cameraImg from '../../images/sideBarImages/Frame.svg';
import { styled, makeStyles } from '@mui/styles';
import {Link, useLocation } from 'react-router-dom';
const Sidebar = () => {
    const useStyle = makeStyles({
        myNav : {
            display: "flex",
            width: "30px",
            height: "30px",
            margin: "15px 8px",
           padding: "5px", 
           cursor: "pointer",
          
        },
        myNav : {
            display: "flex",
            width: "30px",
            height: "30px",
            margin: "15px 8px",
           padding: "5px", 
           cursor: "pointer",
  
   
        },
        mainMenu : {
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            padding: "10px 5px",
            backgroundColor: "#ffffff",
            boxShadow : "0px 2px 4px rgba(0, 0, 0, 0.12)"
        }
    })
 
    const classes = useStyle();
    const location = useLocation();
    const { pathname } = location;

    const splitLocation = pathname.split("/");
   
    return(
        <ul className={classes.mainMenu}>
            <li className={splitLocation[1] === "" ? "myMenuActive" : ""}>
                <Link to ="/">
                <img src={logoImg} className={classes.myNav} />
                </Link>
                </li>
                
                <li>
                  <Link to = "/tradeweb/trading">
                  <img src={homeImg} className={classes.myNav} />
                  </Link>
                </li>
                <li className={splitLocation[2] === "trading" ? "myMenuActive" : ""}>
                <Link to ="/tradeweb/trading">
                <img src={cameraImg} className={classes.myNav} />
                </Link>
                </li>
                <li>
                   <Link to = "/tradeweb/trading">
                   <img src={documentImg} className={classes.myNav} />
                   </Link>
                    </li>
                    <li className={splitLocation[2] === "ledger" ? "myMenuActive" : ""}>
                       <Link to ="/tradeweb/ledger">
                       <img src={bookImg} className={classes.myNav} />
                       </Link>
                    </li>
                    <li className={splitLocation[2] === "transaction" ? "myMenuActive" : ""}>
                       <Link to = "/tradeweb/transaction">
                       <img src={arrowImg} className={classes.myNav} />
                       </Link>
                    </li>
        </ul>
    )
}
export default Sidebar;