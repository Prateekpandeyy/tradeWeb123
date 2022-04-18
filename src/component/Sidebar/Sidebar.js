import React from 'react';
import logoImg from '../../images/PngImages/logo.png';
import documentImg from '../../images/PngImages/document.png';
import homeImg from '../../images/PngImages/home.png';
import bookImg from '../../images/PngImages/book.png';
import arrowImg from '../../images/PngImages/arrow.png';
import confirmationImg from '../../images/PngImages/confirmation.png';
import marginImg from '../../images/PngImages/margin.png';
import requestImg from '../../images/PngImages/request.png';
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
            width: "40px",
            height: "40px",
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
            boxShadow : "0px 2px 4px rgba(0, 0, 0, 0.12)",
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
                  {/* <Link to = "/tradeweb/trading">
                  <img src={homeImg} className={classes.myNav} />
                  </Link> */}
                  <img src={homeImg} className={classes.myNav} />
                </li>
                <li className={splitLocation[2] === "holding" ? "myMenuActive" : ""}>
                <Link to ="/tradeweb/holding" title="Holding">
                <img src={cameraImg} className={classes.myNav} />
                </Link>
                </li>
                <li className={splitLocation[2] === "trading" ? "myMenuActive" : ""}>
                   <Link to = "/tradeweb/trading" title="Trading">
                   <img src={documentImg} className={classes.myNav} />
                   </Link>
                    </li>
                    <li className={splitLocation[2] === "ledger" ? "myMenuActive" : ""}>
                       <Link to ="/tradeweb/ledger" title="Ledger">
                       <img src={bookImg} className={classes.myNav} />
                       </Link>
                    </li>
                    <li className={splitLocation[2] === "transaction" ? "myMenuActive" : ""}>
                       <Link to = "/tradeweb/transaction" title="Transaction">
                       <img src={arrowImg} className={classes.myNav} />
                       </Link>
                    </li>
                     <li className={splitLocation[2] === "confirmation" ? "myMenuActive" : ""}>
                       <Link to = "/tradeweb/confirmation" title="Transaction">
                       <img src={confirmationImg} className={classes.myNav} />
                       </Link>
                    </li>

                   {/* <li className={splitLocation[2] === "margin" ? "myMenuActive" : ""}>
                       <Link to = "/tradeweb/confirmation" title="Transaction">
                       <img src={marginImg} className={classes.myNav} />
                       </Link>
                    </li>
                    <li className={splitLocation[2] === "request" ? "myMenuActive" : ""}>
                       <Link to = "/tradeweb/request" title="Request">
                       <img src={requestImg} className={classes.myNav} />
                       </Link>
               </li> */}
        </ul>
    )
}
export default Sidebar;