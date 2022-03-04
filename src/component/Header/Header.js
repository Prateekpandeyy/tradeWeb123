import React from 'react';
import {  Container, Box, Button, Paper, Breadcrumbs, Typography } from '@mui/material';
import {styled, makeStyles} from '@mui/styles';
import { Link } from 'react-router-dom';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import notificatonImg from '../../images/PngImages/notification.png';
import profileImg from '../../images/PngImages/profile.png';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import transactionImg from '../../images/PngImages/transactionimg.png';
const MainContainer = styled(Paper)({
    display: "flex", 
    width: "100%",
    justifyContent: "space-between",
    padding: "15px 10px"
  
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
    return(
      <MainContainer>
          <NameProfile>
           {props.noBreadcrumb === true ? 
         <>
           <span>
               <img src={transactionImg} style={{width: "20px", height: "20px" , margin: "0 20px"}}/>
           </span>

              <Link 
              style={{color: "#3D3D3D", fontWeight: 600}}
              to = "/">
                  {props.mainLink}
              </Link>
         </>
             
          
            : 
            <Breadcrumbs separator=">" area-label="breadcrumb">
            <Link 
            style={{color: "#3D3D3D", fontWeight: 600}}
            to = "/">
                {props.mainLink}
            </Link>
            <Link to="/"  style={{color: "#3D3D3D", fontWeight: 600}}>
             {props.subLink}
            </Link>
            </Breadcrumbs>}
          </NameProfile>
          <ProfileInfo>
             <Button variant="contained" style={{margin: "0 10px"}}>Bills</Button>
          <img src={notificatonImg} style={{width: "28px", height: "28px", margin: "0 10px",  backgroundColor: "#E3F0FF"}} />
         <img src={profileImg} style={{width : "28px", height: "28px", margin: "0 10px"}} />
         <Typography variant="subtitle1">
           {userName}
             </Typography>
             <ExpandMoreIcon />
          </ProfileInfo>
      </MainContainer>
    )
}
export default Header;