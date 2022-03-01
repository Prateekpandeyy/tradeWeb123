import React, {useState, useEffect} from 'react';
import Layout from '../Layout/Layout';
import {Box, Select, MenuItem, Typography, Button, Grid} from "@mui/material";
import MyContainer from '../commonFunction/MyContainer';
import {styled, makeStyles} from "@mui/styles";
import { FaFileCsv } from 'react-icons/fa';
import { RiFileExcel2Fill } from 'react-icons/ri';
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
          width: "180px",
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
        width: "300px",
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
const MySelect = styled(Select)({
 
    width: "180px",
    height: "40px",
    borderRadius: "10px",
    border: "1px solid #EBEBEB",
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
    const [transactionData, setTransationData] = useState()
    const startupSelectedKeys = [1, 4];
    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("token")
    const classes = useStyle()
    let a = 0;
    let checkedValueTo =  ["532628", "524208", "543210", "523204"]
    const allowedPageSizes = [5, 10, 15]
    useEffect(() => {
        getTransationData()
    }, [])
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
             axios.get(`${baseUrl}/Confirmation_Transaction/Transaction_Summary?type=Commodity&fromDate=20210401&toDate=20220331`, myConfig)
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
    const showCheckBoxesMode = ['none', 'onClick', 'onLongTap', 'always'];
    const selectAllModes = ['allPages', 'page']    
    return(
        <Layout mainLink = "Transaction" noBreadcrumb = {true} >
        
         <TopBox>
         <Box className={classes.boxRoot}>
     
            <select className={classes.MySelect}>
                <option>Trades</option>
                <option> Deliveries</option>
                <option>Receipts</option>
                <option>Payments</option>
                <option>Journals</option>
                <option>Bills</option>
                <option>AGTS</option>
                <option>Mutual Funds</option>
            </select>
            </Box>
            <Box className={classes.boxRoot}>
           
            <select className={classes.MySelect}>
                <option>Item Wise</option>
                <option> Date Wise</option>
            </select>
            </Box>
            <Box className={classes.boxRoot}>
          
                        <select className={classes.MySelect2}>
                            <option>From   -02/06/2021 TO - 02/06/2021</option>
               
            </select>
            </Box>
            <Box className={classes.boxRoot}>
            <MyButton variant="contained">Show</MyButton>
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
             
</DataGrid>
             </Grid>
             </Grid>
            
         </MyContainer>
        </Layout>
    )
}
export default Transaction;