import React from 'react';
import {  Container, Box } from '@mui/material';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { styled } from '@mui/styles';

const MySidebar = styled(Box)({
       
    display: "flex",
    width: "100px",
    height: "100vh"
})
const MainBox = styled(Box)({
    display: "flex", 
    width: "100%",
    flexDirection: "column"
})
const MyHeader = styled(Box)({
    display: "flex",
    width: "100%"
})
const MainContent= styled(Box)({
    display: "flex",
    width: "100%",
    flexDirection: "column"
})
const MainContainer = styled(Box)({
    display: "flex"
    
})
const Layout = (props) => {
    const {mainLink, noBreadcrumb, subLink} = props;
  
    return(
        <>
      <MainContainer>
          
        <MySidebar>
            <Sidebar />
        </MySidebar>
       <MainBox>
       <MyHeader>
            <Header mainLink = {mainLink} 
            noBreadcrumb = {noBreadcrumb}
            subLink = {subLink} />
        </MyHeader>
        <MainContent>
            {props.children}
        </MainContent>
       </MainBox>
      </MainContainer>
        </>
    )
}
export default Layout;