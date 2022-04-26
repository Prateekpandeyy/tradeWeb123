import React, { useState } from "react";
import logoImg from "../../images/PngImages/logo.png";
import documentImg from "../../images/PngImages/document.png";
import homeImg from "../../images/PngImages/home.png";
import bookImg from "../../images/PngImages/book.png";
import arrowImg from "../../images/PngImages/arrow.png";
import confirmationImg from "../../images/PngImages/confirmation.png";
import marginImg from "../../images/PngImages/margin.png";
import requestImg from "../../images/PngImages/request.png";
import cameraImg from "../../images/sideBarImages/Frame.svg";
import { styled, makeStyles } from "@mui/styles";
import { Link, useLocation } from "react-router-dom";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import PaidIcon from "@mui/icons-material/Paid";
const Sidebar = () => {
  const [open2, setOpen2] = useState(false);
  const handleClickOn2 = () => {
    setOpen2(false);
  };
  const handleClickOff2 = () => {
    console.log("header fixed");
    setOpen2(true);
  };
  const useStyle = makeStyles({
    myNav: {
      display: "flex",
      width: "30px",
      height: "30px",
      margin: "15px 8px",
      padding: "5px",
      cursor: "pointer",
    },
    myNav: {
      display: "flex",
      width: "35px",
      height: "35px",
      margin: "15px 8px",
      padding: "5px",
      cursor: "pointer",
    },
    mySubNav: {
      display: "flex",
      width: "27px",
      height: "27px",
      margin: "5px 8px",
      padding: "0px",
      cursor: "pointer",
    },
    mainMenu: {
      listStyle: "none",
      display: "flex",
      flexDirection: "column",
      padding: "10px 5px",
      backgroundColor: "#ffffff",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.12)",
    },
    mainMenu: {
      listStyle: "none",
      display: "",
      flexDirection: "column",
      padding: "10px 5px",
      backgroundColor: "#ffffff",
      width: "100%",
      height: "100%",
      justifyContent: "space-between",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.12)",
    },
    mySubmnu: {
      listStyle: "none",
      display: "flex",
      flexDirection: "column",
      padding: "10px 30px",
      backgroundColor: "#ffffff",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.12)",
    },
    myNavMenu: {
      display: "flex",
      width: "100%",
      
      alignItems: "center"
    },
    mySubNavMenu : {
     
        display: "flex",
        width: "100%",
        margin: "10px 0",
        alignItems: "center"
      
    },
    MyMenuName: {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "18px",
      lineHeight: "27px",
      color: "#9B9B9B",
      margin: "0px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    MyMenuLogo: {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: "25px",
      lineHeight: "38px",
      color: "#0085FF",
      margin: "0px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  const classes = useStyle();
  const location = useLocation();
  const { pathname } = location;

  const splitLocation = pathname.split("/");

  return (
    <ul className={classes.mainMenu}>
      <li className={splitLocation[1] === "" ? "myMenuActive" : ""}>
        <Link to="/" className={classes.myNavMenu}>
          <img src={logoImg} className={classes.myNav} />
          <p className={classes.MyMenuLogo}>Logo</p>
        </Link>
        
      </li>

      <li>
        <Link to = "/tradeweb/trading" className={classes.myNavMenu}>
        <img src={homeImg} className={classes.myNav} />
        <p className={classes.MyMenuName}>Home</p>
                  </Link>
       
      </li>
      <li className={splitLocation[2] === "holding" ? "myMenuActive" : ""}>
        <Link to="/tradeweb/holding" title="Holding" className={classes.myNavMenu}>
          <img src={cameraImg} className={classes.myNav} />
          <p className={classes.MyMenuName}>Holding</p>
        </Link>
      </li>
      <li className={splitLocation[2] === "trading" ? "myMenuActive" : ""}>
        
         <Link  to="/tradeweb/trading" title="Trading" className={classes.myNavMenu}>
          <img src={documentImg} className={classes.myNav} />
          <p className={classes.MyMenuName}>Trading</p>
        </Link>
      </li>
      <li className={splitLocation[2] === "ledger" ? "myMenuActive" : ""}>
       
           <Link to="/tradeweb/ledger" title="Ledger" className={classes.myNavMenu}>
          <img src={bookImg} className={classes.myNav} />
          <p className={classes.MyMenuName}>Ledger</p>
        </Link>
      </li>
      <li className={splitLocation[2] === "transaction" ? "myMenuActive" : ""}>
       
         <Link to="/tradeweb/transaction" title="Transaction" className={classes.myNavMenu}>
          <img src={arrowImg} className={classes.myNav} />
          <p className={classes.MyMenuName}>Transaction</p>
        </Link>
      </li>
      <li className={splitLocation[2] === "confirmation" ? "myMenuActive" : ""}>
       
               <Link  to="/tradeweb/confirmation" title="Confirmation" className={classes.myNavMenu}>
          <img src={bookImg} className={classes.myNav} />
          <p className={classes.MyMenuName}>Confirmation</p>
        </Link>
      </li>

      <li className={splitLocation[2] === "margin" ? "myMenuActive" : ""}>
       
         <Link to="/tradeweb/margin" title="Margin" className={classes.myNavMenu}>
          <img src={marginImg}  className={classes.myNav} />
          <p className={classes.MyMenuName}>Margin</p>
        </Link>
      </li>
      <li
        className={`${classes.myMobileSidebar}`}
        onMouseLeave={() => handleClickOn2()}
      >
        <ListItemButton
          style={{ padding: "0px", listStyle: "none" }}
          onMouseEnter={() => handleClickOff2()}
        >
          <img src={requestImg} className={classes.myNav} />
          <p className={classes.MyMenuName}>Request</p>
        </ListItemButton>
        <Collapse in={open2} unmountOnExit>
          <List component="div">
            <ul className={classes.mySubmnu}>
              <li
                className={splitLocation[2] === "request" ? "myMenuActive" : ""}
              >
                <Link to="/tradeweb/request" title="Payout" className={classes.mySubNavMenu}>
                  {/* <img src={requestImg} className={classes.mySubNav} /> */}
                  <p className={classes.MyMenuName}>Payout</p>
                </Link>
              </li>
              <li>
                <Link to="/tradeweb/pledge" title="Pledge For Margin" className={classes.mySubNavMenu}>
                
                  <p className={classes.MyMenuName}>Pledge For Margin</p>
                </Link>{" "}
              </li>
              {/* <li>
                <Link to="/tradeweb/report" title="Report" className={classes.mySubNavMenu}>
                 
                  <p className={`${classes.MyMenuName}`}>Report</p>
                </Link>{" "}
              </li> */}
            </ul>
          </List>
        </Collapse>
      </li>
      {/* <li className={splitLocation[2] === "request" ? "myMenuActive" : ""}>
                       <Link to = "/tradeweb/request" title="Request">
                       <img src={requestImg} className={classes.myNav} />
                       </Link>
               </li> */}
    </ul>
  );
};
export default Sidebar;
