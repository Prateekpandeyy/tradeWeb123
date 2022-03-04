import React from 'react';
import { Container, Paper, Typography , Select, MenuItem, Box,  Grid } from '@mui/material';
import { styled, makeStyles } from '@mui/styles';
import axios from 'axios';
import {
  Pager, Paging,  DataGrid, Column, RequiredRule, Export,
  Toolbar,
  Item, } from 'devextreme-react/data-grid';
import MyContainer from '../commonFunction/MyContainer';
import BottomData from './BottomData.js';
import 'devextreme/dist/css/dx.light.css';
import Button from 'devextreme-react/button';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { FaFileCsv } from 'react-icons/fa';
import { RiFileExcel2Fill } from 'react-icons/ri';
import { AiFillPrinter } from 'react-icons/ai';
import { GrDocumentText} from 'react-icons/gr';
import {AiFillFilePdf} from 'react-icons/ai';
import htmlImg from '../../images/PngImages/html.png';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';
const BottomLedger = ({ledgerReport}) => {
  const dataGridRef = React.createRef();
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
     const onCellPre = (e) => {
      console.log("eeee", e)
         if (e.columnIndex === 4) {
          
            e.cellElement.style.backgroundColor = "#E1F1FF"
        }
        if(e.columnIndex === 3){
            e.cellElement.style.backgroundColor = "#FFFBEF"
            e.cellElement.style.color = "#E2A705"
        }
     }
   const TemplateNameCell = (e) => {
   
     if(e.data.Debitflag === "D"){
       return Math.abs(e.data.Amount)
     }
     else {
       return 0
     }
   }
   const TemplateNameCell2 = (e) => {
 
    if(e.data.Debitflag === "C"){
      return Math.abs(e.data.Amount)
    }
    return 0
  }
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
const onPirnt = (e) => {
  console.log("print")
  const dataGrid = dataGridRef.current.instance;
//  window.print()
window.print(dataGrid)

}
    return(
        <>
  <MyContainer>
     <Grid container>
          <Grid item sm={12}>
         {/* <DataGrid
         dataSource= {ledgerReport}
         id = "id"
             onCellPrepared={onCellPre}
             onRowPrepared={onRowPre}
             showRowLines = {true}
             showColumnLines = {false}
             columnAutoWidth={true}
             columnMinWidth={160}
             columnHidingEnabled={true}
             columnResizingMode="nextColumn"
           
             noDataText=''
             showBorders={true}> */}
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
               <DataGrid 
                  id="dataGrid"
                  ref={dataGridRef}
                  dataSource={ledgerReport}
                  
                  onCellPrepared={onCellPre}
                  onRowPrepared={onRowPre}
                 
                  columnMinWidth={100}
                
                showColumnLines={false}
                  
                  
                  noDataText='' >
          <Paging enabled={true}  defaultPageSize={4}/>
          <Pager 
           visible={true}
          
           displayMode = "full"
         
           showInfo={true}
           showNavigationButtons = {true} />
        <Column 
         dataField="Date"
        caption="Date"
      >
               <RequiredRule />
        </Column>
        <Column 
        dataField="ExchSeg"
        caption="Exchange"
        
      >
               <RequiredRule />
        </Column>
        <Column
        dataField="Particular"
        caption="Particulaes"
      >
               <RequiredRule />
        </Column>
        <Column 
        dataField="debit"
        caption="Debit"
        cellRender={TemplateNameCell}>
               <RequiredRule />
        </Column>
        <Column 
        dataField="creadit"
        caption="Credit"
        cellRender={TemplateNameCell2}
       >
               <RequiredRule />
        </Column>
        <Column 
        dataField="Amount"
        caption="Balance"
       >
               <RequiredRule />
        </Column>
        
       
    
         </DataGrid>
          </Grid>

      </Grid>
      </MyContainer>
        </>
    )
}
export default BottomLedger;