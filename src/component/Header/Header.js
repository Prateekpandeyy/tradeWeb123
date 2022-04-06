import React from 'react';
import {  Container, Box, Button, Paper, Breadcrumbs, Typography } from '@mui/material';
import {styled, makeStyles} from '@mui/styles';
import { Link } from 'react-router-dom';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import notificatonImg from '../../images/PngImages/notification.png';
import profileImg from '../../images/PngImages/profile.png';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import transactionImg from '../../images/PngImages/transactionimg.png';
import { MySubHeading } from '../commonFunction/MyContainer';

const useStyle = makeStyles({
    linkStyle: {
        color: "#3D3D3D"
    }
})
const MainContainer = styled(Paper)({
    display: "flex", 
    width: "100%",
    justifyContent: "space-between",
    padding: "15px 10px"
  
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
const useStyele = makeStyles({
root: {
    display: "flex", 
    marginLeft: "150px", 
    justifyContent : "space-between"
}
})
const Header  = (props) => {
    const userName = localStorage.getItem("userName")
    const classes = useStyle()
    return(
      <MainContainer>
          <NameProfile>
           {props.noBreadcrumb === true ? 
         <>
           <span>
               <img src={transactionImg} style={{width: "20px", height: "20px" , margin: "0 20px"}}/>
           </span>

              <Link 
              className="breadcrumbStyle"
              to = "/">
                  {props.mainLink}
              </Link>
         </>
             
          
            : 
            <Breadcrumbs separator=">" area-label="breadcrumb"
            style={{fontSize:"20px", fontWeight: "500", color: "#3D3D3D"}}>
            <Link 
           className="breadcrumbStyle"
            to = "/">
                {props.mainLink}
            </Link>
            <Link to="/" className="subBreadcrumbStyle">
             {props.subLink}
            </Link>
            </Breadcrumbs>}
          </NameProfile>
          <ProfileInfo>
             <BillButton variant="contained">Bills</BillButton>
          <img src={notificatonImg} style={{width: "28px", height: "28px", margin: "0 10px",  backgroundColor: "#E3F0FF"}} />
         <img src={profileImg} style={{width : "28px", height: "28px", margin: "0 10px"}} />
        <Link to = "/tradeweb/profile"
        className={classes.linkStyle}>
        <MySubHeading>
           {userName}
             </MySubHeading>
        </Link> 
        
             <ExpandMoreIcon style={{display : "flex", height: "100%", justifyContent : "center", 
            alignItems : "center"}} />
          </ProfileInfo>
      </MainContainer>
    )
}
export default Header;