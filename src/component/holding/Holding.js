import React from 'react';
import Layout from '../Layout/Layout';
import {styled, makeStyles} from "@mui/styles";
import HoldingData from './HoldingData';
import {Box, Select, MenuItem, Typography, Button, Grid} from "@mui/material";
import MyContainer from '../commonFunction/MyContainer';
import {
    DataGrid, Column, Selection, Paging, Summary, TotalItem, MasterDetail, Scrolling, Pager,
} from 'devextreme-react/data-grid';
const TopBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px"
})
const useStyle = (makeStyles)({
    boxRoot: {
        display : "flex", 
        justifyContent: "space-between",
        alignItems: "center"
      
      }, 
      MySelect: {
          display:"flex",
          width: "500px",
    height: "40px",
    background: "#ffffff",
    border: "1px solid #EBEBEB",
    
    boxShadow: "0px 2px 16px rgb(61 61 61 / 6%)",
    borderRadius: "7px",
    padding: "0 10px",
    fontSize: "16px"
      } ,
      MySelect22: {
        display:"flex",
        width: "300px",
  height: "40px",
  background: "#ffffff",
  border: "1px solid #EBEBEB",
  
  boxShadow: "0px 2px 16px rgb(61 61 61 / 6%)",
  borderRadius: "7px",
  padding: "0 10px",
  fontSize: "16px"
    } ,
})

const MyButton = styled(Button)({
    borderRadius: "5px",
    backgroundColor: "#0364BE", 
    boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)",
    borderRadius: "5px",
    minWidth: "120px",
    height: "40px"
})
const Holding = () => {
    const classes = useStyle()
    return(
        <Layout subLink = "Holding">
        <TopBox>
         <Box className={classes.boxRoot}>
     
            <select className={classes.MySelect}>
                <option value={1}>Holding Available in my Demat Account</option>
                <option value={2}> Holding Available with the Broker</option>
                <option value={3}>Holding Pledge for Margin</option>
                
            </select>
            </Box>
            <Box className={classes.boxRoot}>
     
     As On
     </Box>
            <Box className={classes.boxRoot}>
     
     <select className={classes.MySelect22}>
         <option value={1}>Current holding</option>
        
     </select>
     </Box>
     <Box className={classes.boxRoot}>
            <MyButton variant="contained">EDIS</MyButton>
            </Box>
            <Box className={classes.boxRoot}>
            <MyButton variant="contained">Show</MyButton>
            </Box>
            </TopBox>
            <MyContainer>
             <Grid container>
             <Grid style={{padding: "20px"}}>
             <DataGrid 
             dataSource = {HoldingData}
            
              showRowLines={false}
              showCheckBoxesMode={true}
              showBorders = {true}
              columnAutoWidth={true}
             
              showColumnLines = {false}
             keyExpr="id"
          noDataText=""
               alignment="center"
           >
                <Paging enabled={true}  defaultPageSize={3}/>
          <Pager 
           visible={true}
          
           displayMode = "full"
         
           showInfo={true}
           showNavigationButtons = {true} />
                 <Column
                 caption= "Stocks"
                 dataField = "stacks" >
                 </Column>
                  
</DataGrid>
             </Grid>
             </Grid>
            
         </MyContainer>
        </Layout>
    )
}
export default Holding;