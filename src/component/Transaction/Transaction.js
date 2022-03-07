import React, {useState, useEffect} from 'react';
import Layout from '../Layout/Layout';
import {Box, Select, MenuItem, Typography, Button, Grid} from "@mui/material";
import MyContainer from '../commonFunction/MyContainer';
import {styled, makeStyles} from "@mui/styles";
import { FaFileCsv } from 'react-icons/fa';
import { RiFileExcel2Fill, RiTimeLine } from 'react-icons/ri';
import { AiFillPrinter } from 'react-icons/ai';
import { GrDocumentText} from 'react-icons/gr';
import {AiFillFilePdf} from 'react-icons/ai';
import htmlImg from '../../images/PngImages/html.png';
import 'devextreme/dist/css/dx.light.css';
import {
    DataGrid, Column, Selection, Paging, Summary, TotalItem, MasterDetail, Scrolling, Pager,
} from 'devextreme-react/data-grid';
import themes from 'devextreme/ui/themes';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../baseUrl/BaseUrl';
import "./NewFile.scss";
import 'antd/dist/antd.css';

import { DatePicker, Space } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';
const weekFormat = 'MM/DD';
const monthFormat = 'YYYY/MM';

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const customFormat = value => `custom format: ${value.format(dateFormat)}`;

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
          maxWidth: "180px",
    height: "40px",
    background: "#ffffff",
    border: "1px solid #EBEBEB",
    
    boxShadow: "0px 2px 16px rgb(61 61 61 / 6%)",
    borderRadius: "7px",
    padding: "0 10px",
    fontSize: "16px"
      } ,
      MySelect2: {
        display:"flex",
        maxWidth: "300px",
  height: "40px",
  background: "#ffffff",
  border: "1px solid #EBEBEB",
  
  boxShadow: "0px 2px 16px rgb(61 61 61 / 6%)",
  borderRadius: "7px",
  padding: "0 10px",
  fontSize: "16px"
    } 
})
const MyData =  styled(Box)({
    width: "130px",
    height: "40px",
    borderRadius: "5px",
    border: "1px solid #0364BE",
    padding: "5px 10px",
    color: "#0364BE",
  
    fontStyle:"normal",
    fontWeight: 500,
    lineHeight: "20px",
    padding: "10px 18px",
    fontSize: "18px",
    boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)"
})


const MyButton = styled(Button)({
    borderRadius: "5px",
    backgroundColor: "#0364BE", 
    boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)",
    borderRadius: "5px",
    minWidth: "120px",
    height: "40px"
})
const Transaction = () => {
    const [selectValue, setSelectValue] = useState(1);
    const [allMode, selectAllMode] = useState("allPages");
    const [checkBoxesMode, setCheckBoxMode] = useState('Always')
    const [showTime, setShowTime] = useState(true)
    const [transactionData, setTransationData] = useState()
    const startupSelectedKeys = [1, 4];
    const [test, setTest] = useState(1)
    const [timeVal, setTimeVal] = useState(1)
    const [toDate, setDate] = useState("20210401");
    const [fromDate, setFromDate] = useState("20220331")
    const [agts, setShowagts] = useState(false)
    const [agtsTransaction, setAgtsTransaction] = useState([])
    const [transactionAccount, setTransactionAccount] = useState([])
    const [agtsVal, setAgtsVal] = useState()
    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("token")
    const classes = useStyle()
    let a = 0;
    let checkedValueTo =  ["532628", "524208", "543210", "523204"]
    let checkedValueAccount = [4876, 	4595, 	4525, 4539]
    const allowedPageSizes = [5, 10, 15]
    const customWeekStartEndFormat = value =>
  `${moment(value).startOf('week').format(weekFormat)} ~ ${moment(value)
    .endOf('week')
    .format(weekFormat)}`;
    useEffect(() => {
        getTransationData()
    }, [])
    const getTransationShow = () => {
     
     if(test == 1 || test == 2){ 
      const details =
      {
          fromDate: fromDate,
          toDate: toDate,
         type : 2,
      }
      const myConfig = {
          headers: {
             Authorization: "Bearer " + token
          }
       }
       axios.get(`${baseUrl}/Confirmation_Transaction/Transaction_Summary?tradeType=${test}&selectType=${timeVal}&fromDate=${toDate}&toDate=${fromDate}`, myConfig)
  .then((res) => {

      setTransationData(res.data)
  })
     }
     else if(test == 3 || test == 4 || test == 5 || test == 6){

        const details =
        {
            fromDate: fromDate,
            toDate: toDate,
           type : 2,
        }
        const myConfig = {
            headers: {
               Authorization: "Bearer " + token
            }
         }
         axios.get(`${baseUrl}/Confirmation_Transaction/Transaction_Accounts?type=${test}&fromDate=${toDate}&toDate=${fromDate}`, myConfig)
    .then((res) => {
  
        setTransactionAccount(res.data)
    })
       
     }
  
     else if(test == 7){

      const details =
      {
          fromDate: fromDate,
          toDate: toDate,
         type : 2,
      }
      const myConfig = {
          headers: {
             Authorization: "Bearer " + token
          }
       }
       axios.get(`${baseUrl}/Confirmation_Transaction/Transaction_AGTS?segment=${agtsVal}&fromDate=${toDate}&toDate=${fromDate}`, myConfig)
  .then((res) => {

      setAgtsTransaction(res.data)
  })
     
   }

    }
    const getTransationData = () => {
        const details =
            {
                fromDate: "20220401",
                toDate: "20210331",
               type : 2,
            }
            const myConfig = {
                headers: {
                   Authorization: "Bearer " + token
                }
             }
             axios.get(`${baseUrl}/Confirmation_Transaction/Transaction_Summary?tradeType=${test}&selectType=${timeVal}&fromDate=${toDate}&toDate=${fromDate}`, myConfig)
        .then((res) => {
      
            setTransationData(res.data)
        })
    }
 const calculateSelectedRow = (options) => {
   
        if (options.name === 'SelectedRowsSummary') {
             
          if (options.summaryProcess === 'start') {
            options.totalValue = 0;
          } else if (options.summaryProcess === 'calculate') {
            if (options.component.isRowSelected(options.value.ScripCode)) {
              options.totalValue += options.value.NetAmount;
              
            }
          }
        }
        if (options.name === 'SelectedRowsSummaryBuy') {
             
          if (options.summaryProcess === 'start') {
            options.totalValue = 0;
          } else if (options.summaryProcess === 'calculate') {
            if (options.component.isRowSelected(options.value.ScripCode)) {
              options.totalValue += options.value.BuyAmount;
            }
          }
        }
        if (options.name === 'Credit3') {
             
          if (options.summaryProcess === 'start') {
            options.totalValue = 0;
          } else if (options.summaryProcess === 'calculate') {
            if (options.component.isRowSelected(options.value.DocumentNo)) {
              options.totalValue += options.value.Credit;
            }
          }
        }
        if (options.name === 'Debit3') {
             
          if (options.summaryProcess === 'start') {
            options.totalValue = 0;
          } else if (options.summaryProcess === 'calculate') {
            if (options.component.isRowSelected(options.value.DocumentNo)) {
              options.totalValue += options.value.Debit;
            }
          }
        }
      }
    
    const onSelectionChanged = (e)  => {
       
        e.component.refresh(true);
    
      }
    

   
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
       
            e.rowElement.style.margin = "10px";
            e.rowElement.style.fontFamily = 'Poppins';
          e.rowElement.style.fontStyle = "normal";
          e.rowElement.style.fontSize = "16px";
          e.rowElement.style.color = "#3D3D3D";
          e.rowElement.style.lineHeight = "35px"
          e.rowElement.style.fontWeight = 500;
        if(e.rowIndex % 2 === 0){
          e.rowElement.style.backgroundColor = '#E1F1FF';
        }
        }
    }  
    const myBuyAmount = (e) => {
    
      let k = parseFloat(e.value).toFixed(2)
      return k
    }
    const myNetAmount = (e) => {
    
      let k = parseFloat(e.value).toFixed(2)
      return k
    }
    const mySel = (e) => {
     setTest(e.target.value)
    
     if(e.target.value == 1 || e.target.value == 2){
      
       setShowTime(true)
       setShowagts(false)
     }
     else if(e.target.value == 7){
       setShowagts(true)
     }
     else{
       setShowTime(false)
     }

    }
    const showCheckBoxesMode = ['none', 'onClick', 'onLongTap', 'always'];
    const selectAllModes = ['allPages', 'page']    
    const getValue = (e) => {
   
      setDate(e[0].format("YYYYMMDD"))
      setFromDate(e[1].format("YYYYMMDD"))
    }
    return(
        <Layout mainLink = "Transaction" noBreadcrumb = {true} >
        
         <TopBox>
         <Box className={classes.boxRoot}>
     
            <select className={classes.MySelect} value={test} onChange = {(e) => mySel(e)}>
                <option value={1}>Trades</option>
                <option value={2}> Deliveries</option>
                <option value={3}>Receipts</option>
                <option value={4}>Payments</option>
                <option value = {5}>Journals</option>
                <option value = {6}>Bills</option>
                <option value = {7}>AGTS</option>
                <option value = {8}>Mutual Funds</option>
            </select>
            </Box>
           {
             showTime === true || agts === true?
             <Box className={classes.boxRoot}>
           
             <select className={classes.MySelect} value={RiTimeLine}
             onChange={(e) => setTimeVal(e.target.value)}>
                 <option>Item Wise</option>
                 <option> Date Wise</option>
             </select>
             </Box> : ""
           }
           {
             agts === true ?
             <Box className={classes.boxRoot}>
           
             <select className={classes.MySelect} value = {agtsVal} onChange={(e) => setAgtsVal(e.target.value)}>
                 <option value="C">Cash</option>
                 <option value = "F"> Comm</option>
                 <option value = "K">F &#38; O</option>
                 <option value = "X"> FX</option>
             </select>
             </Box> : ""
           }
            <Box className={classes.boxRoot}>
          
            <Space direction="vertical" size={12}>
    <RangePicker
      defaultValue={[moment(`From - ${fromDate}`, dateFormat), 
      moment(`To - ${toDate}`, dateFormat)]}
      format={dateFormat}
      onChange={getValue}
    />
  
  </Space>
            </Box>
            <Box className={classes.boxRoot}>
            <MyButton variant="contained" onClick={getTransationShow}>Show</MyButton>
            </Box>
            <Box className={classes.boxRoot}>
            <FaFileCsv style={{color: "#80BB55", margin : "2px 8px", fontSize: "30px", border : "1px solid #EBEBEB",
boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)", borderRadius : "10px", padding: "5px", width : "40px", height : "40px" }} />
<img src={htmlImg} style={{margin : "2px 8px", border : "1px solid #EBEBEB",
boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)",  borderRadius : "10px", padding: "5px", maxWidth : "40px", maxHeight : "40px" }} />
<AiFillFilePdf style={{color: "#107C41", margin : "2px 8px", border : "1px solid #EBEBEB",
boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)", borderRadius : "10px", padding: "5px", width : "40px", height : "40px" }} />
<AiFillPrinter style={{color: "#424343", margin : "2px 8px", border : "1px solid #EBEBEB",
boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)", borderRadius : "10px", padding: "5px", width : "40px", height : "40px" }} />
<GrDocumentText style={{color: "#696D6E", margin : "2px 8px", border : "1px solid #EBEBEB",
boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)", borderRadius : "10px", padding: "5px", width : "40px", height : "40px" }} />
<MyData>
           High Light
       </MyData>
            </Box>
         </TopBox>
         <MyContainer>
             <Grid container  style={{padding: "20px"}}>
             <Grid>
{
  showTime === true && agts === false ?
  <DataGrid
  id="gridContainer"
  defaultSelectedRowKeys = {checkedValueTo}
  onSelectionChanged={onSelectionChanged}
  dataSource={transactionData}
  keyExpr="ScripCode"
  showRowLines = {true}
  onRowPrepared={onRowPre}
  columnAutoWidth={true}
  columnMinWidth={80}
  showColumnLines = {false}
  columnHidingEnabled={true}
  columnResizingMode="nextColumn"
 
  noDataText=''
  showBorders={true}>
    
  <Paging enabled={true}  defaultPageSize={5}/>
  <Pager 
   visible={true}
   allowedPageSizes = {allowedPageSizes}
   displayMode = "full"
 
   showInfo={true}
   showNavigationButtons = {true} />
  <Selection
    mode="multiple"
    selectAllMode= "allPages"
    showCheckBoxesMode= "always"
  />
        
         
         <Column 
           dataField="ScripCode"
           caption="Script Code"
           />
          
           <Column 
           dataField="ScripName"
           caption="Name" />
         
         <Column 
           dataField="Buy"
           caption="Buy Qty"
           />
         
           <Column 
           dataField="BuyAmount"
           caption="Buy Amount"
           />
          
         <Column
         dataField="Sell"
         caption = "Sales Qty"
         />
          <Column
         dataField="SellAmount"
         caption = "Sell Amount"
         />
          <Column
         dataField="Net"
         caption = "Net Qty"
         />
          <Column
         dataField="NetAmount"
         caption = "Net Amount"
         />
        <Column
        dataField="AvgRate"
        caption="Avg.Rate" 
       />
       
        
        <Summary calculateCustomSummary={calculateSelectedRow}>
    <TotalItem
      name="SelectedRowsSummary"
      summaryType="custom"
       id="myDataGrid"
      displayFormat="{0}"
      customizeText={myNetAmount}
      cssClass={"warning4"}
      showInColumn="NetAmount" />
       <TotalItem
      name="SelectedRowsSummaryBuy"
      summaryType="custom"
    
      displayFormat="{0}"
      cssClass={"warning4"}
      customizeText={myBuyAmount}
      showInColumn="BuyAmount" />
         <TotalItem
      cssClass={"warning4"}
      displayFormat="Total"
      showInColumn="ScripCode" />
  </Summary>
     
</DataGrid> : ""
}
{
  showTime === false && agts === false ?
  <DataGrid
  id="gridContainer"
  defaultSelectedRowKeys = {checkedValueAccount}
  onSelectionChanged={onSelectionChanged}
  dataSource={transactionAccount}
  keyExpr="DocumentNo"
  showRowLines = {true}
  onRowPrepared={onRowPre}
  columnAutoWidth={true}
  columnMinWidth={80}
  showColumnLines = {false}
  columnHidingEnabled={true}
  columnResizingMode="nextColumn"
 
  noDataText=''
  showBorders={true}>
    
  <Paging enabled={true}  defaultPageSize={5}/>
  <Pager 
   visible={true}
   allowedPageSizes = {allowedPageSizes}
   displayMode = "full"
 
   showInfo={true}
   showNavigationButtons = {true} />
  <Selection
    mode="multiple"
    selectAllMode= "allPages"
    showCheckBoxesMode= "always"
  />
        
         
         <Column 
           dataField="Type"
           caption="Type"
           />
          
           <Column 
           dataField="DocumentNo"
           caption="Document" />
         
         <Column 
           dataField="Date"
           caption="Date"
           />
         
           <Column 
           dataField="Particular"
           caption="Particular"
           />
          
         <Column
         dataField="Debit"
         caption = "Debit"
         />
          <Column
         dataField="Credit"
         caption = "Credit"
         />
        
        
        <Summary calculateCustomSummary={calculateSelectedRow}>
        <TotalItem
      name="Debit3"
      summaryType="custom"
    
      displayFormat="{0}"
      cssClass={"warning4"}
     
      showInColumn="Credit" />
       <TotalItem
      name="Debit3"
      summaryType="custom"
    
      displayFormat="{0}"
      cssClass={"warning4"}
     
      showInColumn="Debit" />
         <TotalItem
      cssClass={"warning4"}
      displayFormat="Total"
      showInColumn="DocumentNo" />
  </Summary>
     
</DataGrid> : ""
}
{
  agts === true ?
  <DataGrid
  id="gridContainer"
  defaultSelectedRowKeys = {checkedValueTo}
  onSelectionChanged={onSelectionChanged}
  dataSource={agtsTransaction}
  keyExpr="Brokerage"
  showRowLines = {true}
  onRowPrepared={onRowPre}
  columnAutoWidth={true}
  columnMinWidth={80}
  showColumnLines = {false}
  columnHidingEnabled={true}
  columnResizingMode="nextColumn"
 
  noDataText=''
  showBorders={true}>
    
  <Paging enabled={true}  defaultPageSize={5}/>
  <Pager 
   visible={true}
   allowedPageSizes = {allowedPageSizes}
   displayMode = "full"
 
   showInfo={true}
   showNavigationButtons = {true} />
  <Selection
    mode="multiple"
    selectAllMode= "allPages"
    showCheckBoxesMode= "always"
  />
        
         
         <Column 
           dataField="Date"
           caption="Date"
           />
                   <Column 
           dataField="Exchange"
           caption="Exch"
           />
           <Column 
           dataField="ExchTRX_Chrg"
           caption="Exchange Charge" />
         

         
           <Column 
           dataField="BSFlag"
           caption="Bs"
           />
          
         <Column
         dataField="Sell"
         caption = "Sales Qty"
         />
          <Column
         dataField="SellAmount"
         caption = "Sell Amount"
         />
          <Column
         dataField="Net"
         caption = "Net Qty"
         />
          <Column
         dataField="NetAmount"
         caption = "Net Amount"
         />
        <Column
        dataField="AvgRate"
        caption="Avg.Rate" 
       />
       
        
        <Summary calculateCustomSummary={calculateSelectedRow}>
    <TotalItem
      name="SelectedRowsSummary"
      summaryType="custom"
       id="myDataGrid"
      displayFormat="{0}"
      customizeText={myNetAmount}
      cssClass={"warning4"}
      showInColumn="NetAmount" />
       <TotalItem
      name="SelectedRowsSummaryBuy"
      summaryType="custom"
    
      displayFormat="{0}"
      cssClass={"warning4"}
      customizeText={myBuyAmount}
      showInColumn="BuyAmount" />
         <TotalItem
      cssClass={"warning4"}
      displayFormat="Total"
      showInColumn="ScripCode" />
  </Summary>
     
</DataGrid> : ""
}
             </Grid>
             </Grid>
            
         </MyContainer>
        </Layout>
    )
}
export default Transaction;