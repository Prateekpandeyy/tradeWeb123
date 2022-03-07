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
import { DataGrid, Column,Summary, TotalItem, Paging, Pager } from 'devextreme-react/data-grid';
import { baseUrl } from '../baseUrl/BaseUrl';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/locale/zh_CN';
import { DatePicker,  Space } from 'antd';
import 'antd/dist/antd.css';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';
const data2 = [
    {
      OrderID : 1,
      TradeID : "1",
      TradeTime : "2342000",
      Stlmnt : "20:12:20",
      Buy : "29292929",
        MarketRate : "2992",
        Brokerage : "2929",
        BuyValue : "1919",
        SellValue : "29292992",
        ScripCode : "2020",
        NetValue : ""
    }
]
const data3 = [
  {
      ScripCode : 1,
      order : "Central GST @9 %",
      trade : 2.13,
      
  },
  {
    ScripCode : 2,
    order : "SEBI FEES",
    trade : 0.02,
    
},
{
  ScripCode : 3,
  order : "Stamp Duty",
  trade : 4.0,
  
}
,  {
  ScripCode : 4,
  order : "State GST @9 &",
  trade : 2.13,
  
},
{
  ScripCode : 4,
  order : "Transaction Charges [Special]",
  trade : 23.00,
  
},
{
  ScripCode : 4,
  order : "Due To Us",
  trade : 23.48,
  
}
]
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
          maxWidth: "200px",
          
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
    width: "150px",
    height: "36px",
    borderRadius: "5px",
    border: "1px solid #EBEBEB",
    padding: "5px 10px",
    boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)"
})

const MyButton = styled(Button)({
    borderRadius: "5px",
    backgroundColor: "#0364BE", 
    boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)",
    borderRadius: "5px",
    minWidth: "120px"
})
const Trading = () => {
    const [selectValue, setSelectValue] = useState(1);
    const [exchange, setExchange] = useState([])
    const [showSetlmentType, setShowSetlmentType] = useState(true)
   const [stlType, setStlType] = useState([])
    const [stlfieldType , setStlFieldType] = useState("")
    const [exchangeValue, setExchangeValue] = useState("")
    const [data, setData] = useState(data2)
    const [data22, setData2] = useState(data3)
    const token = localStorage.getItem("token")
    const allowedPageSizes = [5, 10, 15]
    const checkedValueTo = ["2020"]
    const [getFirstValue, setFirstValue] = useState();
    const [getScrondValue, setSecondValue] = useState()
    const [date22, setStartDate] = useState();
    const dataGridRef = React.createRef();
useEffect(()=>{
  getExchange()
} ,[])
const getExchange = () => {
  const myConfig = {
            headers: {
               Authorization: "Bearer " + token
            }
         }
 
  axios.get(`${baseUrl}/Bills/Bills_exchSeg`, myConfig)
    .then((res) => {
      setExchange(res.data)
     
    });
};
const myBuyAmount = (e) => {
    
  let k = parseFloat(e.value).toFixed(2)
  return k
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
    const onRowPre2 =(e) => {  
        
      if(e.rowType == "header"){
          
        
          e.rowElement.style.fontFamily = 'Poppins';
          e.rowElement.style.fontStyle = "normal";
          e.rowElement.style.fontSize = "16px";
          e.rowElement.style.color = "#3D3D3D";
          e.rowElement.style.fontWeight = 600;
        
          e.rowElement.style.lineHeight = "35px"
        }  
        if(e.rowType == "data"){
            e.rowElement.style.backgroundColor = "#fff";
            e.rowElement.style.margin = "10px";
            e.rowElement.style.fontFamily = 'Poppins';
          e.rowElement.style.fontStyle = "normal";
          e.rowElement.style.fontSize = "16px";
          e.rowElement.style.color = "#3D3D3D";
          e.rowElement.style.fontWeight = 700;
          e.rowElement.style.lineHeight = "35px"
        
        }
  }    
    let a ;
    const calculateSelectedRow = (options) => {
      if (options.name === 'SelectedRowsSummaryBuy') {
             
        if (options.summaryProcess === 'start') {
          options.totalValue = 0;
        } else if (options.summaryProcess === 'calculate') {
          if (options.component.isRowSelected(options.value.ScripCode)) {
            options.totalValue += options.value.SellValue;
            
          }
        }
      }
      if (options.name === 'SelectedRowsSummarybottom') {
             
        if (options.summaryProcess === 'start') {
          options.totalValue = 0;
        } else if (options.summaryProcess === 'calculate') {
          if (options.component.isRowSelected(options.value.ScripCode)) {
            options.totalValue += options.value.trade;
            
          }
        }
      }
      }
      // exchange option function
      const exchangeFunction = (e) => {
    
      setStlFieldType([])
      setFirstValue(e.target.value[1])
      let a = e.target.value.slice(0, 2)
     setExchangeValue(e.target.value)
        if(a === "AB"){
          setShowSetlmentType(true)
        }
        else{
          setShowSetlmentType(false)
        }
        const myConfig = {
          headers: {
             Authorization: "Bearer " + token
          }
       }

axios.get(`${baseUrl}/Bills/Bills_cash_settTypes_list?exch=${e.target.value[1]}`, myConfig)
  .then((res) => {
   
   setStlType(res.data)
  });
      }



      const showData = () => {
        let pp = []
           const myConfig = {
          headers: {
             Authorization: "Bearer " + token
          }
       }


axios.get(`${baseUrl}/Bills/Bills_cash_settType?exch_settType=${getFirstValue}${stlfieldType}&dt=${date22}`, myConfig)
  .then((res) => {
  
 setData(res.data)
 
 res.data.map((i) => {
 if(i.ScripName === "Central GST @ 9%"){
   let a = {
     ScripCode : i.ScripCode,
     order : i.ScripName, 
     trade : i.BuyValue
   }
   pp.push(a)
 }

 else if(i.ScripName === "SEBI FEES"){
  let a = {
    ScripCode : i.ScripCode,
    order : i.ScripName, 
    trade : i.BuyValue
  }
  pp.push(a)
}

else if(i.ScripName === "Stamp Duty"){
  let a = {
    ScripCode : i.ScripCode,
    order : i.ScripName, 
    trade : i.BuyValue
  }
  pp.push(a)
}

else if(i.ScripName === "State GST @ 9%"){
  let a = {
    ScripCode : i.ScripCode,
    order : i.ScripName, 
    trade : i.BuyValue
  }
  pp.push(a)
}

else if (i.ScripName === "ransaction Charges [Normal]") {
  let a = {
    ScripCode : i.ScripCode,
    order : i.ScripName, 
    trade : i.BuyValue
  }
  pp.push(a)
}

else if (i.ScripName === "Due To Us :"){
  let a = {
    ScripCode : i.ScripCode,
    order : i.ScripName, 
    trade : i.NetValue
  }
  pp.push(a)
}
 })
  })
  setData2(pp)

      }

      const stymtType = (e) => {
        setStlFieldType(e.target.value)
      }
      const handleDateChange = (e) => {
        
       
      }
      const exportGrid = React.useCallback(() => {
        const doc = new jsPDF();
        const dataGrid = dataGridRef.current.instance;
    
        exportDataGridToPdf({
          jsPDFDocument: doc,
          component: dataGrid,
        }).then(() => {
          doc.save('Customers.pdf');
        });
      });
      const onExporting = (e) => {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('Main sheet');
        const dataGrid = dataGridRef.current.instance;
        exportDataGrid({
            component: dataGrid,
            worksheet: worksheet,
            customizeCell: function(options) {
                const excelCell = options;
                excelCell.font = { name: 'Arial', size: 12 };
                excelCell.alignment = { horizontal: 'left' };
            } 
        }).then(function() {
            workbook.xlsx.writeBuffer()
                .then(function(buffer) {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
                });
        });
        e.cancel = true;
    }
    
    const onPirnt = (e) => {

      const dataGrid = dataGridRef.current.instance;
    //  window.print()
    window.print(dataGrid)
    
    }
    const onExportingCsv = (e) => {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('Main sheet');
      const dataGrid = dataGridRef.current.instance;
      exportDataGrid({
          component: dataGrid,
          worksheet: worksheet,
          customizeCell: function(options) {
              const excelCell = options;
              excelCell.font = { name: 'Arial', size: 12 };
              excelCell.alignment = { horizontal: 'left' };
          } 
      }).then(function() {
          workbook.csv.writeBuffer()
              .then(function(buffer) {
                  saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.csv');
              });
      });
      e.cancel = true;
  }
  const dateFun = (e) => {

    let a = e.format("YYYYMMDD")
    setStartDate(a)
  
  }
 
      const classes = useStyle()
    return(
        <Layout subLink = "Bills">
        
         <TopBox>
         <Box className={classes.boxRoot}>
            <Typography variant="body1" mr={2}>
            Exchange : 
        </Typography>
        <select className={classes.MySelect} onChange={(e) => exchangeFunction(e)}
        value = {exchangeValue} multiple={false}>
           <option key={0}> select </option>
               {
                 exchange?.map((i, e) => {
                   return(
                   <>
                    
                     <option key={e} value ={i.CESCd}>{i.exchange + " " + i.segment}</option>
                   </>
                   )
                 })
               }
             
            </select>
            </Box>
         {showSetlmentType === true ?
         
         <Box className={classes.boxRoot}>
         <Typography variant="body1" mr={2}>
        Stlmnt Type : 
     </Typography>
 
       <select className={classes.MySelect2} onChange= {(e) => stymtType(e)}
       value={stlfieldType} multiple = {false}>
                 <option key={1}> select </option>
     {
       stlType.map((i) => {
         return(
           <option key={i.type} value={i.type}>{i.description} </option>
         )
       })
     }
  </select>
   
         </Box>  : ""}
            <Box className={classes.boxRoot}>
       <MyData>
       <DatePicker
          defaultValue={moment(new Date(), 'DD MMM, YYYY')}
          defaultPickerValue={moment(new Date(), 'DD MMM, YYYY')}
          format={'DD/MM/YYYY'}
          onChange={(date) => dateFun(date)} 
          bordered={false}
          allowClear={false}
          suffixIcon
          style={{
            height: "auto",
            width: "auto",
            border: "none",
            borderRadius: "0px",
            cursor: "pointer",
            fontSize: "17px",
            margin: "0px",
            padding: "0px"
          }}
        />
       </MyData>
    

            </Box>
            <Box className={classes.boxRoot}>
            <MyButton variant="contained" onClick = {(e)=> showData(e)}>Show</MyButton>
            </Box>
            <Box className={classes.boxRoot}>
            <Box sx={{textAlign: "right"}} p={2}>
<FaFileCsv title="Csv File" onClick={onExportingCsv} style={{color: "#80BB55", cursor : "pointer", margin : "2px 8px", fontSize: "30px", border : "1px solid #EBEBEB",
boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)", borderRadius : "10px", padding: "5px", width : "40px", height : "40px" }} />
<img src={htmlImg} title="html" style={{margin : "2px 8px", cursor : "pointer", border : "1px solid #EBEBEB",
boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)",  borderRadius : "10px", padding: "5px", maxWidth : "40px", maxHeight : "40px" }} />
<RiFileExcel2Fill title="Excel" onClick={onExporting} style={{color: "#107C41", cursor : "pointer", margin : "2px 8px", border : "1px solid #EBEBEB",
boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)", borderRadius : "10px", padding: "5px", width : "40px", height : "40px" }} />
<AiFillPrinter title="Print" onClick={onPirnt} style={{color: "#424343", cursor : "pointer", margin : "2px 8px", border : "1px solid #EBEBEB",
boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)", borderRadius : "10px", padding: "5px", width : "40px", height : "40px" }} />
<GrDocumentText title="pdf" onClick={exportGrid} style={{color: "#696D6E", cursor : "pointer", margin : "2px 8px", border : "1px solid #EBEBEB",
boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)", borderRadius : "10px", padding: "5px", width : "40px", height : "40px" }} />
                </Box>
            </Box>
         </TopBox>
         <MyContainer>
             <Grid container>
             <Grid style={{padding: "20px"}}>
             <DataGrid 
             dataSource = {data}
             onRowPrepared={onRowPre}
             ref={dataGridRef}
              showRowLines={false}
              showCheckBoxesMode={true}
              showBorders = {true}
              columnAutoWidth={true}
              defaultSelectedRowKeys = {checkedValueTo}
              showColumnLines = {false}
             keyExpr="ScripCode"
          noDataText=""
               alignment="center"
           >
                <Paging enabled={true}  defaultPageSize={3}/>
          <Pager 
           visible={true}
           allowedPageSizes = {allowedPageSizes}
           displayMode = "full"
         
           showInfo={true}
           showNavigationButtons = {true} />
                   <Column 
                   dataField="OrderID"
                   caption="Order"
                   alignment="center">
                   </Column>
                   <Column 
                   dataField="TradeID"
                   caption="Trade">
                   </Column>
                   <Column 
                   dataField="TradeTime"
                   caption= "Time">
                   </Column>
                   <Column 
                   dataField="Stlmnt"
                   caption="Security">
                   </Column>
                   <Column 
                   dataField="Buy"
                   caption="Buy">
                   </Column>
                
                   <Column 
                   dataField="MarketRate"
                   caption="Market Rate"></Column>
                <Column
                dataField="Brokerage"
                caption="Brokerage"></Column>
                <Column 
                dataField="BuyValue"
                caption="Buy Value">
                </Column>
                <Column 
                dataField="SellValue"
                caption="Sell Value">
                </Column>
                <Column 
                dataField = "NetValue"
                caption="Net Value"></Column>
                    
                    <Summary calculateCustomSummary={calculateSelectedRow}>
                    <TotalItem
              cssClass={"variantClass"}
              displayFormat="Net Item Amount (Sale - Buy)"
              showInColumn="OrderID" />
                <TotalItem
              name="SelectedRowsSummaryBuy"
              summaryType="custom"
            
              displayFormat="{0}"
              cssClass={"warning4"}
            
              showInColumn="NetValue" />
              </Summary>
</DataGrid>
             </Grid>
             </Grid>
            
         </MyContainer>
         <MyContainer>
             <Grid container>
             <Grid  style={{padding: "20px"}}>
             <DataGrid 
             dataSource = {data22}
             onRowPrepared={onRowPre2}
            
              showRowLines={false}
              showCheckBoxesMode={false}
              showBorders = {false}
              columnAutoWidth={true}
            
              showColumnLines = {false}
              keyExpr="ScripCode"
          noDataText=""
         
             >
              
               
                <Column 
                dataField="order"
                caption = "Charges"
            >
                </Column>
                <Column 
                   dataField="trade"
                   caption = ""
                  >
                   </Column>
                    
                    <Summary>
                    <TotalItem
              cssClass={"warning"}
              displayFormat="Sub Total"
              showInColumn="order" />
                 <TotalItem
           
              summaryType="sum"
              column="trade"
              displayFormat="{0}"
              cssClass={"warning4"}
            customizeText = {myBuyAmount}
              showInColumn="trade" />
              </Summary>
           
             
</DataGrid>
             </Grid>
             </Grid>
            
         </MyContainer>
        </Layout>
    )
}
export default Trading;