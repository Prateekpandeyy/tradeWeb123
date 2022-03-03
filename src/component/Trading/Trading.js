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
      trade : "2.13",
      
  },
  {
    ScripCode : 2,
    order : "SEBI FEES",
    trade : "0.02",
    
},
{
  ScripCode : 3,
  order : "Stamp Duty",
  trade : "4.0",
  
}
,  {
  ScripCode : 4,
  order : "State GST @9 &",
  trade : "2.13",
  
},
{
  ScripCode : 4,
  order : "Transaction Charges [Special]",
  trade : "23.00",
  
},
{
  ScripCode : 4,
  order : "Due To Us",
  trade : "23.48",
  
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
          width: "250px",
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
    const [showSetlmentType, setShowSetlmentType] = useState(false)
   const [stlType, setStlType] = useState([])
    const [stlfieldType , setStlFieldType] = useState("")
    const [exchangeValue, setExchangeValue] = useState("")
    const [data, setData] = useState(data2)
    const [data22, setData2] = useState(data3)
    const token = localStorage.getItem("token")
    const allowedPageSizes = [5, 10, 15]
    const checkedValueTo = ["2020"]
//     useEffect((i) => {
//       getExchange()
//     }, [])
//     const getExchange = () => {
//       
//       const myConfig = {
//         headers: {
//            Authorization: "Bearer " + token
//         }
//      }
//      axios.get(`${baseUrl}/Bills/Bills_exchSeg`, myConfig)
// .then((res) => {
// setExchange(res.data)
//   
// })


//     }
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
      console.log("eee", e.target.value)
     setExchangeValue(e.target.value)
        if(e.target.value[1] === "C"){
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


axios.get(`${baseUrl}/Bills/Bills_cash_settType?exch_settType=NN&dt=20210624`, myConfig)
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
      const classes = useStyle()
    return(
        <Layout subLink = "Bills">
        
         <TopBox>
         <Box className={classes.boxRoot}>
            <Typography variant="body1" mr={2}>
            Exchange : 
        </Typography>
        <select className={classes.MySelect} onChange={(e) => exchangeFunction(e)}
        value = {exchangeValue}>
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
         
            <Box className={classes.boxRoot}>
            <Typography variant="body1" mr={2}>
           Stlmnt Type : 
        </Typography>
    
          <select className={classes.MySelect} onChange= {(e) => stymtType(e)}
          value={stlfieldType}>
                    <option key={1}> select </option>
        {
          stlType.map((i) => {
            return(
              <option key={i.type} value={i.type}>{i.description} </option>
            )
          })
        }
     </select>
      
            </Box> 
            <Box className={classes.boxRoot}>
       <MyData>
           02/06/2021
       </MyData>
            </Box>
            <Box className={classes.boxRoot}>
            <MyButton variant="contained" onClick = {(e)=> showData(e)}>Show</MyButton>
            </Box>
            <Box className={classes.boxRoot}>
            <FaFileCsv style={{color: "#80BB55", margin : "2px 8px", fontSize: "30px", border : "1px solid #EBEBEB",
boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)", borderRadius : "10px", padding: "5px", width : "40px", height : "40px" }} />
<img alt="html Image" src={htmlImg} style={{margin : "2px 8px", border : "1px solid #EBEBEB",
boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)",  borderRadius : "10px", padding: "5px", maxWidth : "40px", maxHeight : "40px" }} />
<AiFillFilePdf style={{color: "#107C41", margin : "2px 8px", border : "1px solid #EBEBEB",
boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)", borderRadius : "10px", padding: "5px", width : "40px", height : "40px" }} />
<AiFillPrinter style={{color: "#424343", margin : "2px 8px", border : "1px solid #EBEBEB",
boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)", borderRadius : "10px", padding: "5px", width : "40px", height : "40px" }} />
<GrDocumentText style={{color: "#696D6E", margin : "2px 8px", border : "1px solid #EBEBEB",
boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)", borderRadius : "10px", padding: "5px", width : "40px", height : "40px" }} />

            </Box>
         </TopBox>
         <MyContainer>
             <Grid container>
             <Grid style={{padding: "20px"}}>
             <DataGrid 
             dataSource = {data}
             onRowPrepared={onRowPre}
            
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
                    
                    <Summary calculateCustomSummary={calculateSelectedRow}>
                    <TotalItem
              cssClass={"warning"}
              displayFormat="Sub Total"
              showInColumn="order" />
                 <TotalItem
              name="SelectedRowsSummarybottom"
              summaryType="custom"
            
              displayFormat="{0}"
              cssClass={"warning4"}
            
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