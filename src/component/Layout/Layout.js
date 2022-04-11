import React, {useEffect, useState} from 'react';
import {  Container, Box } from '@mui/material';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { styled } from '@mui/styles';
import MobileSidebar from '../Sidebar/MobileSidebar';
import moment from 'moment';
import { useNavigate } from 'react-router';
const MySidebar = styled(Box)({
       
    display: "flex",
  
    height: "100vh",
    position: "fixed",
    zIndex: 99
})
const MyMobileSidebar = styled(Box)({
       
    display: "flex",
  width: "1000%",
    height: "100vh",
    position: "fixed",
    zIndex: 99
})
const MainBox = styled(Box)({
    display: "flex", 
    width: "100%",
    flexDirection: "column"
})
const MyHeader = styled(Box)({
    display: "flex",
    width: "100%",
    position: "fixed",
    zIndex:99999,
    padding: "0 0 0 100px"
})
const MyHeaderMobile = styled(Box)({
    display: "flex",
    width: "100%",
    position: "fixed",
    zIndex:99,
   
})
const MainContent= styled(Box)({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: "80px 0 0 100px"
})
const MainContentMobile = styled(Box)({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: "80px 0 0 0"
})
const MainContainer = styled(Box)({
    display: "flex",
    width: "100%"
    
})
const Layout = (props) => {
    const [width, setScreenWidth] = useState(window.screen.width)
    const [mobileSidebar, setMobileSidebar] = useState(true)
    let history = useNavigate()
    let tokenExpireTime = localStorage.getItem("tokenExpireTime")
    let current_time = moment().format("HH:mm:ss")
    console.log("done22", tokenExpireTime.split(" ")[1] === current_time)
    const getScWidth = () => {
       setScreenWidth(window.innerWidth)
    }
    useEffect(() => {
       window.addEventListener("resize", getScWidth)
       if(tokenExpireTime.split(" ")[1] === current_time){
           localStorage.removeItem("userName")
           localStorage.removeItem("userId")
           localStorage.removeItem("token")
           localStorage.removeItem("tokenExpireTime")
           history.push("/")
       }
       return () => {
           window.removeEventListener("resize", getScWidth)
       }
    })
    const {mainLink, noBreadcrumb, subLink} = props;
  const getMobileSidebar = (e) => {
    
      setMobileSidebar(e)
  }
    return(
        <>
      <MainContainer>
          
       {
           width > 768 ? 
           <MySidebar>
           <Sidebar />
       </MySidebar> : 
       <>
       {mobileSidebar === false ?
       <MyMobileSidebar>
       <MobileSidebar />
   </MyMobileSidebar> : ""}
       </> 
       }
       <MainBox>
      {
          width > 768 ?
          <MyHeader>
          <Header mainLink = {mainLink} 
          noBreadcrumb = {noBreadcrumb}
          subLink = {subLink} 
         />
      </MyHeader> : 
       <MyHeaderMobile>
       <Header mainLink = {mainLink} 
       noBreadcrumb = {noBreadcrumb}
       subLink = {subLink}
       getMobileSidebar = {getMobileSidebar} />
       
   </MyHeaderMobile>
      }
        {
            width > 768 ?
            <MainContent>
            {props.children}
        </MainContent> :
        <MainContentMobile>
        {props.children}
    </MainContentMobile>
        }
       </MainBox>
      </MainContainer>
        </>
    )
}
export default Layout;