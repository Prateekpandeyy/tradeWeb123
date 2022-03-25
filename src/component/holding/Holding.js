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
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    AreaChart,
    Area,
  } from "recharts";
  const data = [
    { name: "", uv: 20, pv: 2400, amt: 2400 },
    { name: "", uv: 60, pv: 2000, amt: 2300 },
    { name: "", uv: 150, pv: 2000, amt: 2300 },
    { name: "", uv: 100, pv: 2000, amt: 2300 },
    { name: "", uv: 300, pv: 2000, amt: 2300 },
    { name: "", uv: 120, pv: 2000, amt: 2300 },
    { name: "", uv: 200, pv: 2000, amt: 2300 },
    { name: "", uv: 80, pv: 2000, amt: 2300 },
    { name: "", uv: 10, pv: 2000, amt: 2300 },
    { name: "", uv: 150, pv: 2000, amt: 2300 },
  ];
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
    const onRowPre = (e) => {
        if(e.rowType == "header"){
            
          e.rowElement.style.backgroundColor = '#E1F1FF';
          e.rowElement.style.fontFamily = 'Poppins';
          e.rowElement.style.fontStyle = "normal";
          e.rowElement.style.fontSize = "14px";
          e.rowElement.style.color = "#3D3D3D";
          e.rowElement.style.fontWeight = 600;
        
          e.rowElement.style.lineHeight = "35px"
        }  
        if(e.rowType == "data"){
       
            e.rowElement.style.margin = "10px";
            e.rowElement.style.fontFamily = 'Poppins';
          e.rowElement.style.fontStyle = "normal";
          e.rowElement.style.fontSize = "12px";
          e.rowElement.style.color = "#3D3D3D";
          e.rowElement.style.lineHeight = "35px"
          e.rowElement.style.fontWeight = 400;
        }
      };
      const cellRender = (e) => {
          console.log("cellRender", e)
          return(
              <>
               <AreaChart
          width={80}
          height={40}
          margin={{ top: 20, right: 5, bottom: 5, left: 5 }}
          data={data}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="rgba(0, 100, 0, 0.2)" stopOpacity={1.0} />
              <stop offset="100%" stopColor="rgba(0, 100, 0, 0.2)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="uv"
            stroke="rgba(0, 184, 36, 1)"
            strokeWidth={2}
            // fill="rgba(0, 100, 0, 0.2)"
            fillOpacity={5} fill="url(#colorUv)" 
          />
        </AreaChart>
              </>
          )
      }
    
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
     
     As On :
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
             onRowPrepared={onRowPre}
             keyExpr="id"
          noDataText=""
               alignment="center"
               showRowLines = {true}
               columnAutoWidth={true}
               showColumnLines = {false}
  columnHidingEnabled={true}
  columnResizingMode="nextColumn"
 
  noDataText=''
  showBorders={false}
           >
                               <Selection
                  mode="multiple"
                
                  showCheckBoxesMode="always"
                />
                <Paging enabled={true}  defaultPageSize={15}/>
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
                cellRender={cellRender} >
                 </Column>
                 <Column
                 caption= "Quantity"
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
                 caption= "Net Profit & loss"
                 dataField = "CurrentValue" >
                 </Column>
                 <Column
                 caption= "Buy"
                 dataField = "CurrentValue" >
                 </Column>
                 <Column
                 caption= "Sell"
                 dataField = "CurrentValue" >
                 </Column>
                  
</DataGrid>
             </Grid>
             </Grid>
            
         </MyContainer>
        </Layout>
    )
}
export default Holding;