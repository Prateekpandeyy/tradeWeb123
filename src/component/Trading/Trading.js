import React, {useState} from 'react';
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
import {
    DataGrid, Column,Summary, TotalItem, RequiredRule, ColumnFixing, FilterRow, SearchPanel, Export, Toolbar,
    Item, GroupPanel, Selection, Grouping
} from 'devextreme-react/data-grid';
const data2 = [
    {
        id : 1,
        order : "1",
        trade : "2342000",
        time : "20:12:20",
        security : "29292929",
        buy : "2992",
        sell : "2929",
        market : "1919",
        brokerage : "29292992",
        buy2 : 12929,
        sell : "292929",
        net : "2929292"
    }
]
const data3 = [
  {
      id : 1,
      order : "Central GST @9 %",
      trade : "2.13",
      
  },
  {
    id : 2,
    order : "SEBI FEES",
    trade : "0.02",
    
},
{
  id : 3,
  order : "Stamp Duty",
  trade : "4.0",
  
}
,  {
  id : 4,
  order : "State GST @9 &",
  trade : "2.13",
  
},
{
  id : 4,
  order : "Transaction Charges [Special]",
  trade : "23.00",
  
},
{
  id : 4,
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
const MySelect = styled(Select)({
   position : "static",
    width: "250px",
    height: "36px",
    borderRadius: "10px",
    border: "1px solid #EBEBEB",
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
    const classes = useStyle()
    const TemplateNameCell = () => {
   let kt = data3.map((i) => {
      return(
        <p key={i.order}>{i.order}</p>
      )
    })
    return kt
    
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
   
        if (options.name === 'SelectedRowsSummary') {
             
          if (options.summaryProcess === 'start') {
          
            options.totalValue = 0;
          } else if (options.summaryProcess === 'calculate') {
           
            options.totalValue = options.totalValue
            if (options.component.isRowSelected(options.value.id)) {
            
              options.totalValue = Number(a) + Number(options.value.net);
              a = options.totalValue;
            }
          }
        }
      }
      
    return(
        <Layout subLink = "Bills">
        
         <TopBox>
         <Box className={classes.boxRoot}>
            <Typography variant="body1" mr={2}>
            Exchange : 
        </Typography>
        <select className={classes.MySelect}>
                <option>NSE Cash</option>
                <option> BSE Cash</option>
                <option>IDE Cash</option>
            </select>
            </Box>
            <Box className={classes.boxRoot}>
            <Typography variant="body1" mr={2}>
           Stlmnt Type : 
        </Typography>
        <select className={classes.MySelect}>
                <option>All</option>
                <option> Single</option>
                <option>Both</option>
            </select>
            </Box>
            <Box className={classes.boxRoot}>
       <MyData>
           02/06/2021
       </MyData>
            </Box>
            <Box className={classes.boxRoot}>
            <MyButton variant="contained">Show</MyButton>
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
             <Grid sm={12} style={{padding: "20px"}}>
             <DataGrid 
             dataSource = {data2}
             onRowPrepared={onRowPre}
            
              showRowLines={false}
              showCheckBoxesMode={true}
              showBorders = {true}
              columnAutoWidth={true}
            
              showColumnLines = {false}
             keyExpr="id"
          noDataText=""
               alignment="center">
                   <Column 
                   dataField="order"
                   caption="Charges"
                   alignment="center">
                   </Column>
                   <Column 
                   dataField="trade"
                   caption="Trade">
                   </Column>
                   <Column 
                   dataField="time"
                   caption= "Time">
                   </Column>
                   <Column 
                   dataField="security"
                   caption="Security">
                   </Column>
                   <Column 
                   dataField="buy"
                   caption="Buy">
                   </Column>
                   <Column 
                   dataField="sell"
                   caption="Sell">
                   </Column>
                   <Column 
                   dataField="market"
                   caption="Market Rate"></Column>
                <Column
                dataField="brokerage"
                caption="Brokerage"></Column>
                <Column 
                dataField="buy2"
                caption="Buy Value">
                </Column>
                <Column 
                dataField="sell"
                caption="Sell Value">
                </Column>
                <Column 
                dataField = "net"
                dataField="Net Value"></Column>
                    
                    <Summary calculateCustomSummary={calculateSelectedRow}>
                    <TotalItem
              cssClass={"variantClass"}
              displayFormat="Net Item Amount (Sale - Buy)"
              showInColumn="order" />
              </Summary>
</DataGrid>
             </Grid>
             </Grid>
            
         </MyContainer>
         <MyContainer>
             <Grid container>
             <Grid sm={12} style={{padding: "20px"}}>
             <DataGrid 
             dataSource = {data3}
             onRowPrepared={onRowPre2}
            
              showRowLines={false}
              showCheckBoxesMode={false}
              showBorders = {false}
              columnAutoWidth={true}
            
              showColumnLines = {false}
             keyExpr="id"
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
              </Summary>
</DataGrid>
             </Grid>
             </Grid>
            
         </MyContainer>
        </Layout>
    )
}
export default Trading;