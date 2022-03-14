import React from 'react';
import Layout from '../Layout/Layout';
import {styled, makeStyles} from "@mui/styles";
import HoldingData from './HoldingData';
import {Box, Select, MenuItem, Typography, Button, Grid} from "@mui/material";
import MyContainer from '../commonFunction/MyContainer';
import {
    DataGrid, Column, Selection, Paging, Summary, TotalItem, MasterDetail, Scrolling, Pager,
} from 'devextreme-react/data-grid';
import {
    Chart,
    Series,
    ArgumentAxis,
    CommonSeriesSettings,
    Export,
    Legend,
    Margin,
  } from 'devextreme-react/chart';
  
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
    const onRowPre =(e) => {  
       
        if(e.rowType == "header"){
          e.rowElement.style.backgroundColor = '#E1F1FF';
    e.rowElement.style.fontFamily = 'Poppins';
    e.rowElement.style.fontStyle = "normal";
    e.rowElement.style.fontSize = "16px";
    e.rowElement.style.color = "#3D3D3D";
    e.rowElement.style.fontWeight = 600;
  
    e.rowElement.style.lineHeight = "35px"

                 }  
        if(e.rowType == "data"){
          e.rowElement.style.borderBottom = "1px solid #F0F0F0";
          e.rowElement.style.margin = "10px";
          e.rowElement.style.fontFamily = 'Poppins';
        e.rowElement.style.fontStyle = "normal";
        e.rowElement.style.fontSize = "16px";
        e.rowElement.style.color = "#3D3D3D";
        e.rowElement.style.fontWeight = 500;
        e.rowElement.style.lineHeight = "35px"
     
        }
      
    } 
    const TemplateNameCell = (e) => {
        console.log("templateNameCell", e.value)
        return(
            <Chart
          palette="Harmony Light"
       
          dataSource={HoldingData}
         
        >
         
          <Series type="area" valueField="id"  argumentField="graph"></Series>
          
        </Chart>
       
        )
    }
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
             onRowPrepared={onRowPre}
               
           >
                 <Selection
    mode="multiple"
    selectAllMode= "allPages"
    showCheckBoxesMode= "always"
  />
                <Paging enabled={true}  defaultPageSize={3}/>
          <Pager 
           visible={true}
          
           displayMode = "full"
         
           showInfo={true}
           showNavigationButtons = {true} />
                 <Column
                 caption= "Stocks"
                 dataField = "stack" >
                 </Column>
                 <Column
                 caption= "Graph"
                 dataField = "graph"
                 cellRender={TemplateNameCell} >
                 </Column>
                 <Column
                 caption= "Graph"
                 dataField = "Quantity" >
                 </Column>
                 <Column
                 caption= "Current Price"
                 dataField = "Current" >
                 </Column>
                 <Column
                 caption= "Current Value"
                 dataField = "CurrentValue" >
                 </Column>
                 <Column
                 caption= "Net Profit 	&#38; loss"
                 dataField = "NetProfile" >
                 </Column>
                 <Column
                 caption= "Buy"
                 dataField = "buyTxt" >
                 </Column>
                 <Column
                 caption= "Sell"
                 dataField = "sellTxt" >
                 </Column>
                  
</DataGrid>
             </Grid>
             </Grid>
            
         </MyContainer>
        </Layout>
    )
}
export default Holding;