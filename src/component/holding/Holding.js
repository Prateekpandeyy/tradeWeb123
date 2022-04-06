import React, {useState, useEffect} from 'react';
import Layout from '../Layout/Layout';
import {styled, makeStyles} from "@mui/styles";
import HoldingData from './HoldingData';
import {baseUrl} from '../baseUrl/BaseUrl';
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
import axios from 'axios';
import moment from 'moment';
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
  let num = {
    accountNumber : "", 
    name : ""
  }
  const userName = localStorage.getItem("userName")
    const [accountNumber, setAccountNumber] = useState([])
    const [date, setDate] = useState("")
     const [HoldingDatatop, setHoldingData] = useState([])
     const [graphData, setGraphData] = useState([])

    const token = localStorage.getItem("token");
    const myConfig = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const classes = useStyle()
    const getDate = () => {
    
      axios.get(
         `${baseUrl}/Holding/Holding_MyDematAct_HoldingDates`,
         myConfig
       )
       .then((res) => {
        res.data.map((i) => {
         num.name = userName
        setDate(i.name)
        setAccountNumber([num])
        
        })
       })
     }
     const getAccountNumber = () => {
     
       axios.get(
         `${baseUrl}/Holding/Holding_myDematAct_List`,
         myConfig
       )
       .then((res) => {
       

        
         res.data.map((i) => {
           num.accountNumber = i.DematActNo
         
         setAccountNumber([num])
         
         })
        
       })
     }
     useEffect(() => {
       getDate()
       getAccountNumber()
     }, [])
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
      let gData = []
      let gObj = {}
    // onSelecton holding
    const onSelectionHolding = (e) => {
     
      
      let accountNumber = "";
      e.currentSelectedRowKeys.map((i) => {
accountNumber = i.accountNumber;
      })
      axios.get(
        `${baseUrl}/Holding/Holding_myDematAct_Current?dematActNo=${accountNumber}&graphDays=484`,
        myConfig
      )
      .then((res) => {
      
        setHoldingData(res.data)
        res.data.map((i) => {
             gObj ={
               name : "",
               uv: i.Rate,
               pv : i.Value,
               amt : i.Rate
             }
             gData.push(gObj)
            
        })
     
        setGraphData(gData)
      })   
    }
  // Rate Value 
  const rateValue = (e) => {
    return parseFloat(Math.abs(e.Rate)).toFixed(2);
  }
  const valueFun = (e) => {
    return parseFloat(Math.abs(e.Value)).toFixed(2)
  }
  const myBuyAmount = (e) => {
    
    let k = parseFloat(e.value).toFixed(2)
    return k
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
         <option>{moment(date).format("DD/MM/YYYY")}</option>
     </select>
     </Box>
     <Box className={classes.boxRoot}>
            <MyButton variant="contained">EDIS</MyButton>
            </Box>
            <Box className={classes.boxRoot}>
            <MyButton variant="contained">Show</MyButton>
            </Box>
            </TopBox>
            <TopBox>
            <Grid container>
             <Grid style={{padding: "20px"}}>
          
             <DataGrid 
             dataSource = {accountNumber}
            onRowPrepared={onRowPre}
          onSelectionChanged = {onSelectionHolding}
              alignment="center"
              showRowLines = {true}
              columnAutoWidth={true}
              showColumnLines = {false}
 columnHidingEnabled={true}
 columnResizingMode="nextColumn"
 showBorders={false}
          >
                 <Selection
                 mode="multiple"
               
                 showCheckBoxesMode="always"
               />
                <Column
                caption= "DP ID / BOID"
               dataField="accountNumber" >
                </Column>
                <Column
                caption= "Name"
                dataField = "name">
                </Column>
               
            </DataGrid> 
             </Grid>
             </Grid>
              </TopBox>
            <MyContainer>
             <Grid container>
             <Grid style={{padding: "20px"}}>
             <DataGrid 
             dataSource = {HoldingDatatop}
             onRowPrepared={onRowPre}
             keyExpr="ISIN"
          noDataText=""
               alignment="center"
               showRowLines = {true}
               columnAutoWidth={true}
               showColumnLines = {false}
  columnHidingEnabled={true}
  columnResizingMode="nextColumn"
 id="holdingDataGird"
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
                 caption= "Company Name"
                 dataField = "CompanyName" >
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
                 caption= "Rate"
                 dataField = "Rate"
                 calculateCellValue={rateValue} >
                 </Column>
                 <Column
                 caption= "Value"
                 calculateCellValue={valueFun}
                 dataField = "Value">
                 </Column>
                 <Column
                 caption= "Type"
                 dataField = "BalanceType">
                 </Column>
                 <Summary>
               <TotalItem
         cssClass={"warning4"}
         displayFormat="Total"
         showInColumn="CompanyName" />
            <TotalItem
      
         summaryType="sum"
         column="Value"
         displayFormat="{0}"
         cssClass={"warning4"}
      customizeText={myBuyAmount}
         showInColumn="buy" />
         </Summary>
                  
</DataGrid>
             </Grid>
             </Grid>
            
         </MyContainer>
        </Layout>
    )
}
export default Holding;