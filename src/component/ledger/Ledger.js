
import React, {useState, useEffect} from 'react';
import { Container, Paper, Box, Typography , Select, MenuItem, Grid } from '@mui/material';
import { styled, makeStyles } from '@mui/styles';

import {
    DataGrid, Column, 
    Summary, TotalItem, Selection, Grouping
} from 'devextreme-react/data-grid';
import BottomLedger from './BottomLedger';
import ChartComp from './ChartComp';
import { FaFileCsv } from 'react-icons/fa';
import { RiFileExcel2Fill } from 'react-icons/ri';
import { AiFillPrinter } from 'react-icons/ai';
import { GrDocumentText} from 'react-icons/gr';
import {AiFillFilePdf} from 'react-icons/ai';
import { baseUrl } from '../baseUrl/BaseUrl';
import axios from 'axios';
import Layout from '../Layout/Layout';
import MyContainer from '../commonFunction/MyContainer';
import htmlImg from '../../images/PngImages/html.png';
import 'devextreme/dist/css/dx.light.css';
 const useStyle = (makeStyles)({
    boxRoot: {
        display : "flex", 
        justifyContent: "flex-end",
        alignItems: "center"
     
      }, MySelect: {
        display:"flex",
        width: "100px",
  height: "30px",
  background: "#ffffff",
  border: "1px solid #EBEBEB",
 
  boxShadow: "0px 2px 16px rgb(61 61 61 / 6%)",
  borderRadius: "7px",
 
  fontSize: "16px",
  margin:  "5px auto"
    } ,
    MySelect2: {
        display:"flex",
        width: "200px",
  height: "40px",
  background: "#ffffff",
  border: "1px solid #EBEBEB",
 
  boxShadow: "0px 2px 16px rgb(61 61 61 / 6%)",
  borderRadius: "7px",
  padding: "0 10px",
  fontSize: "16px"
    }
   
})
 const TopBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px"
})
const Ledger = () => {
         const [selectValue , setSelectValue] = useState();
         const [date, setDate] = useState([])
         const [debit, setDebit] = useState(67)
         const [creadit, setCreadit] = useState();
         const [balance, setBalance] = useState()
         const [tradeValue, setTradeValue] = useState(1)
         const [detData, setDetData] = useState()
         const [checkValue, setCheckValue] = useState(null)
         const classes = useStyle()  
         let checkedValueTo = ["NSE-F&O       ", "BSE-Cash      ", "NSE-Cash      ", "NSE-FX        ", "MCX-Comm", "NCDEX-Comm"]
      
        let cread = 0;
         const [searchDate, setSearchDate] = useState({
             fromDate : "20200401",
             toDate : "20210331"
         })
        
         const chartData = [
           {
               data : "Creadit", value : creadit
           },
           {
               data : "Debit",  value  : debit
           },
           {
               data : "Balance" , value : balance
           }
       ]  
       const customUpdateRow = (e) => {
        console.log("eee", e)
      }                                         
        
       const getSelectData = (e) => {


 
          const details = {
              fromDate: searchDate.fromDate,
              toDate: searchDate.toDate,
              type_exchseg : [
                  {
                      type:  e.row.data.Type,
                      exchseg : [
                          e.row.data.CESCD
                      ]
                  }
              ]
          }
          axios({
              method : "POST",
              headers: {
                  Authorization: "Bearer " + token
               },
              url : `${baseUrl}/TradeWeb/Ledger_Detail`,
              data : details
          })
              .then((res) => {

              getledData(res.data)
                
              })    } 
              const getledData = (e) => {
               
                    setDetData(e)
              }
                        const finincialYear = (e) => {
                                              setSelectValue(e.target.value);
                                              if(e.target.value === "1"){
                                                   setSearchDate({
                                                      toDate: "20210401",
                                                      fromDate: "20220331"
                                                  })
                                              }
                                              else if(e.target.value === "2"){
                                                   setSearchDate({
                                                      toDate: "20200401",
                                                      fromDate: "20210331"
                                                  })
                                              }
                                              else if(e.target.value === "3"){
                                                   setSearchDate({
                                                      toDate: "20190401",
                                                      fromDate: "20200331"
                                                  })
                                              }
                                           
                                          }
         const RenderTitleHeader = () => {
                       return(
                           <select className={classes.MySelect} value={tradeValue} 
                           onChange={(e) => tradeFun(e)}>
                           <option value={1}>Trading</option>
                           <option value={2}> NetTrade</option>
                       </select>
                       )
                   }
                   const TemplateNameCell = (e) => {
                   
                    let aka
                    if(checkValue == e.rowIndex){
                     
                     
                      aka = true
                    }
                    else {
                     
                      aka = false
                    }
                             return(
                                  <>
                                  {aka === true ?
                                                                  <input type="checkbox" onChange = {() => valueFun(e.rowIndex)} style={{display: "flex", width: "20px"
                                                                  , height: "20px", margin: "auto"}} checked={true} className = "checked" ></input>
                                                              :
                                                              <input type="checkbox" onChange = {() => valueFun(e.rowIndex)} style={{display: "flex", width: "20px"
                                                              , height: "20px", margin: "auto"}} checked={false} className = "checked" ></input>
                                                          }
                                  </>  )
                         }
                         const valueFun = (e) => {
                         
                           setCheckValue(e)
                           
                         }
                         const tradeFun = (e) => {
                           setTradeValue(e.target.value)
                          
                            axios.get(`${baseUrl}/TradeWeb/Ledger_Summary?type=${e.target.value}&fromDate=${searchDate.fromDate}&toDate=${searchDate.toDate}`, myConfig)
                            .then((res) => {
                            
                        if(res.status === 200){
                        
                        
                          setDate(res.data)
                         
                        }
                            })
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
          const myBuyAmount = (e) => {
    
            let k = parseFloat(e.value).toFixed(2)
            return k
          }   
      
         const token = localStorage.getItem("token")
         const myConfig = {
                       headers: {
                          Authorization: "Bearer " + token
                       }
                    }
           useEffect(() => {
                         getDate()
                       }, [searchDate])
                       const getDate = () => {
                         axios.get(`${baseUrl}/TradeWeb/Ledger_Summary?type=1&fromDate=${searchDate.fromDate}&toDate=${searchDate.toDate}`, myConfig)
                         .then((res) => {
                         
                     if(res.status === 200){
                     
                     
                       setDate(res.data)
                      
                     }
                         })
                       }
                       const onSelectionChanged = (e)  => {
   
                                 e.component.refresh(true);
                              
                               }
                               const calculateSelectedRow = (options) => {
 
     
                               
                                          
                                   if (options.name === 'OpeningBalance') {

                                     if (options.summaryProcess === 'start') {
                                       options.totalValue = 0;
                                     } else if (options.summaryProcess === 'calculate') {
                                   
                                      if (options.component.isRowSelected(options.value.ExchSeg)) {
                                       
                                        options.totalValue += options.value.OpeningBalance;
                                       }
                                     }
                                   
                                   }
                                   
                                   if (options.name === 'Debit') {
                                     if (options.summaryProcess === 'start') {
                                       options.totalValue = 0;
                                     } else if (options.summaryProcess === 'calculate') {
                                       if (options.component.isRowSelected(options.value.ExchSeg)) {
                                         options.totalValue += options.value.Debit;
                                         
                                   
                                       }
                                     }
                                     else if (options.summaryProcess === "finalize"){
                                      setDebit(parseFloat(options.totalValue).toFixed(2))
                                    } 
                                   } 
                                   if (options.name === 'Creadit') {
                                     if (options.summaryProcess === 'start') {
                                       options.totalValue = 0;
                                     } else if (options.summaryProcess === 'calculate') {
                                       if (options.component.isRowSelected(options.value.ExchSeg)) {
                                         options.totalValue += options.value.Credit;
                                        
                                       }
                                     }
                                     else if (options.summaryProcess === "finalize"){
                                      setCreadit(parseFloat(options.totalValue).toFixed(2))
                                    }
                                   } 
                                   if (options.name === 'Balance') {
                                   
                                     if (options.summaryProcess === 'start') {
                                       options.totalValue = 0;
                                     } else if (options.summaryProcess === 'calculate') {
                                       if (options.component.isRowSelected(options.value.ExchSeg)) {
                                         options.totalValue += options.value.Balance;
                                        
                                       }
                                     }
                                     else if (options.summaryProcess === "finalize"){
                                       setBalance(parseFloat(options.totalValue).toFixed(2))
                                     }
                                   }  
                               
                               
                                                                                      }
  return(
   <>
   <Layout mainLink = "BP EQUTIES PVT. LTD" subLink = "Ledger">
   <MyContainer>
   <TopBox>
       <Typography variant="h4">
            Ledger 
        </Typography>
        <Box className={classes.boxRoot}>
            <Typography variant="body1" mx={2}>
            Summary for the financial year : 
        </Typography>
     
            <select className={classes.MySelect2} 
             onChange={(e) => finincialYear(e)} value = {selectValue}>
                <option value = "1">2022-2021</option>
                <option value="2">2021-2020</option>
                <option value = "3">2020-2019</option>
            </select>
            </Box>
       </TopBox>
   <Grid container style={{padding: "20px"}}>
<Grid item sm ={3}>
<ChartComp chartData = {chartData} />
</Grid>
<Grid item sm = {9}>

  

             {/* <DataGrid
             id="dataGrid"
             onSelectionChanged={onSelectionChanged}
             dataSource={date}
             keyExpr="ClientCode"
             
             onRowPrepared={onRowPre}
            
             columnMinWidth={100}
            
           showColumnLines={false}
              onFocusedCellChanged = {getSelectData}
             defaultSelectedRowKeys = {checkedValueTo}
             noDataText=''> */}
              <DataGrid
          id="gridContainer"
          defaultSelectedRowKeys = {checkedValueTo}
          onSelectionChanged={onSelectionChanged}
          dataSource={date}
          keyExpr="ExchSeg"
          showRowLines = {true}
          onRowPrepared={onRowPre}
          columnAutoWidth={true}
          columnMinWidth={80}
          showColumnLines = {false}
          columnHidingEnabled={true}
          allowColumnResizing={true}
          allowColumnReordering={true}
          columnResizingMode="nextColumn"
         
          onFocusedCellChanged = {getSelectData}
          noDataText=''
          showBorders={true}>
                 <Selection
            mode="multiple"
         allowSelectAll={false}
            showCheckBoxesMode= "none"
          />
                     
                     <Column
            headerCellRender={RenderTitleHeader}
            cellRender={TemplateNameCell}
          >
              
            </Column>
             
                <Column
                dataField="ExchSeg"
                caption="ExchSeg"
                alignment="center">
                   
                </Column>
             
                <Column
                dataField="OpeningBalance"
               caption="Opening Balance"
                alignment="center">
                   
                </Column>
             
                <Column
                dataField="Debit"
                caption="Debit"
                alignment="center">
                   
                </Column>
             
                <Column
                dataField="Credit"
                caption = "Creadit"
                alignment="center">
                   
             </Column>
             
                <Column
                dataField="Balance"
                caption= "Balance"
                alignment="center">
                   
                </Column>
                <Summary calculateCustomSummary={calculateSelectedRow}>
                <TotalItem
                   cssClass={"warning"}
                   displayFormat="Total"
                   showInColumn="ExchSeg" />
                    <TotalItem
                   name="OpeningBalance"
                   summaryType="custom"
                   customizeText={myBuyAmount}
                   displayFormat="{0}"
                   cssClass={"warning"}
                   showInColumn="OpeningBalance" />
                   <TotalItem
                   name="Debit"
                   summaryType="custom"
                   customizeText={myBuyAmount}
                   displayFormat="{0}"
                   cssClass={"warning2"}
                   showInColumn="Debit" />
                    <TotalItem
                   name="Creadit"
                   summaryType="custom"
                   customizeText={myBuyAmount}
                   displayFormat="{0}"
                   cssClass={"warning"}
                   showInColumn="Creadit" />
                     <TotalItem
                   name="Balance"
                   summaryType="custom"
                   customizeText={myBuyAmount}
                   displayFormat="{0}"
                   cssClass={"warning3"}
                   showInColumn="Balance" />
                   </Summary>
                 </DataGrid> 
  
</Grid>
   </Grid>
   </MyContainer>
   <Grid container>
            <Grid item sm = {12} style={{padding: "0px 20px"}}>
                <Box sx={{textAlign: "right"}} p={2}>
<FaFileCsv style={{color: "#80BB55", margin : "2px 8px", fontSize: "30px", border : "1px solid #EBEBEB",
boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)", borderRadius : "10px", padding: "5px", width : "40px", height : "40px" }} />
<img src={htmlImg} style={{margin : "2px 8px", border : "1px solid #EBEBEB",
boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)",  borderRadius : "10px", padding: "5px", maxWidth : "40px", maxHeight : "40px" }} />
<RiFileExcel2Fill style={{color: "#107C41", margin : "2px 8px", border : "1px solid #EBEBEB",
boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)", borderRadius : "10px", padding: "5px", width : "40px", height : "40px" }} />
<AiFillPrinter style={{color: "#424343", margin : "2px 8px", border : "1px solid #EBEBEB",
boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)", borderRadius : "10px", padding: "5px", width : "40px", height : "40px" }} />
<GrDocumentText style={{color: "#696D6E", margin : "2px 8px", border : "1px solid #EBEBEB",
boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)", borderRadius : "10px", padding: "5px", width : "40px", height : "40px" }} />
                </Box>
             <BottomLedger ledgerReport = {detData} 
             />
            </Grid>
            </Grid>
   </Layout>
   </>
  )
}
export default Ledger;