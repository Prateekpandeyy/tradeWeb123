import React , {useEffect, useState} from 'react';
import {  Container, Box, Button, Paper, Breadcrumbs, Typography } from '@mui/material';
import {styled, makeStyles} from '@mui/styles';
import { Link } from 'react-router-dom';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import notificatonImg from '../../images/PngImages/notification.png';
import profileImg from '../../images/PngImages/profile.png';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import transactionImg from '../../images/PngImages/transactionimg.png';
import { MySubHeading } from '../commonFunction/MyContainer';
import HorizontalSplitIcon from '@mui/icons-material/HorizontalSplit';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router';
const useStyle = makeStyles({
    linkStyle: {
        color: "#3D3D3D"
    },
    MySelect: {
      width: "161px",
      height: "33px", 
   fontFamily : "Poppins",
      fontStyle: "normal",
      fontWeight: 400,
      fontZize: "22px",
      lineHeight: "33px",
      outline: "none",
      border: "0px",
      backgroundColor: "#fff"
    },
})
const MainContainer = styled(Box)({
    display: "flex", 
    width: "100%",
    justifyContent: "space-between",
    padding: "15px 10px",
  backgroundColor: "#fff"
})
const BillButton = styled(Button)({
    borderRadius: "6px !important",
    width: "70px",
height:"35px",
textTransform: 'none !important',
backgroundColor: "#0364BE !important",
boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06) !important",
fontSize: "12px !important",
lineHeight: "18px !important",
fontWeight :" 500 !important",
fontStyle: "normal !important",
fontFamily:"Poppins !important"
})
const NameProfile = styled(Box)({
    display: "flex", 
    width: "50%",
    padding: "10px"
})
const ProfileInfo = styled(Box)({
    display: "flex",
    width: "50%",
     padding: "10px",
     justifyContent: "flex-end",
     lineHeight: "20px"
   
})

const Header  = (props) => {
    const userName = localStorage.getItem("userName")
    const [width, setScreenWidth] = useState(window.screen.width)
    const [mobileView, setMobileView] = useState(false)
    const [expand, setExpand] = useState(true)
    let history = useNavigate()
    const getScWidth = () => {
       setScreenWidth(window.innerWidth)
       if(window.innerWidth > 768){
           setMobileView(false)
       }
       else{
           setMobileView(true)
       }
    }
    useEffect(() => {
       window.addEventListener("resize", getScWidth)
       return () => {
           window.removeEventListener("resize", getScWidth)
       }
    })
    const profileFun = (e) => {
    
      if(e == 2){
        history("/tradeweb/profile")
      }
      else if (e == 3){
        console.log("ee", e)
        localStorage.clear()
        history("/")
      }
    }

    const myMobileView = () => {
       
         props.getMobileSidebar(!expand)
        setExpand(!expand)
    }
    const classes = useStyle()
    return(
      <MainContainer>
         {
             expand === false ? <NameProfile></NameProfile>:
             <NameProfile>
             {props.noBreadcrumb === true ? 
           <>
             <span>
                 <img src={transactionImg} style={{width: "20px", height: "20px" , margin: "0 20px"}}/>
             </span>
  
              
                    {props.mainLink}
              
           </>
               
            
              : 
              <Breadcrumbs separator="" area-label="breadcrumb"
              style={{fontSize:"1.25rem", fontWeight: "500", color: "#3D3D3D"}}>
             <p style={{margin:"0px"}}>
                  {props.mainLink}
              </p>
              <Link to="/tradeweb/ledger" className="subBreadcrumbStyle">
               {props.subLink}
              </Link>
              </Breadcrumbs>}
            </NameProfile>
         }
        {
            width > 768 ?
            <ProfileInfo>
            <BillButton variant="contained">Bills</BillButton>
         <img src={notificatonImg} style={{width: "28px", height: "28px", margin: "0 10px",  backgroundColor: "#E3F0FF"}} />
        
      
       {/* <MySubHeading>
          {userName}
            </MySubHeading> */}
            <select className={classes.MySelect} onChange={(e) => profileFun(e.target.value)}>
                <option value={1}>{userName}</option>
                <option value={2}> Profile</option>
                <option value={3}>Logout</option>
              </select>
 
       
          
         </ProfileInfo> : 
        <>
        {
            expand === true ?
            <ProfileInfo>
            <span onClick = {() => myMobileView()}>
            <HorizontalSplitIcon/>
            </span>
          </ProfileInfo>  : 
          <ProfileInfo>
            <span>
            <CloseIcon onClick = {() => myMobileView()}/>
            </span>
          </ProfileInfo> 
        }
        </>
        }
      </MainContainer>
    )
}
export default Header;