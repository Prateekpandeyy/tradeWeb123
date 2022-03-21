import React, {useRef} from 'react';
import { Container, Paper, Typography , Select, MenuItem, Box,  Grid } from '@mui/material';
import { styled, makeStyles } from '@mui/styles';
import axios from 'axios';
import {
  Pager, Paging,  DataGrid, Column, RequiredRule, Export,
  Toolbar,
  Sorting,
  Item, Grouping, GroupPanel} from 'devextreme-react/data-grid';
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
import { useReactToPrint } from 'react-to-print';

import { ComponentToPrint } from './ComponentToPrint';
const BottomLedger = ({ledgerReport}) => {
  const dataGridRef = React.createRef();
  const componentRef = useRef();
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
}        
     const onCellPre = (e) => {

         if (e.columnIndex === 4) {
             e.cellElement.style.textAlign = "right"
            e.cellElement.style.backgroundColor = "#E1F1FF"
        }
        if(e.columnIndex === 3){
          e.cellElement.style.textAlign = "right"
            e.cellElement.style.backgroundColor = "#FFFBEF"
            e.cellElement.style.color = "#E2A705"
        }
        if(e.columnIndex === 5){
          e.cellElement.style.textAlign = "right"
        }
     }
   const TemplateNameCell = (e) => {
  
     if(e.Debitflag === "D"){
        return parseFloat(Math.abs(e.Amount)).toFixed(2)
     }
     else {
       return parseFloat(0).toFixed(2);
     }
   }
   const TemplateNameCell2 = (e) => {

    if(e.Debitflag === "C"){
      return (parseFloat(Math.abs(e.Amount)).toFixed(2))
    }
   else{
    return parseFloat(0).toFixed(2);
   }

  }
  const TemplateNameCell3 = (e) => {

    
      return (parseFloat(Math.abs(e.Amount)).toFixed(2))
    
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
  
  const dataGrid = dataGridRef.current.instance;
  let kk = document.getElementById("dataGrid")
//  window.print()
// var divContents = document.getElementById("dataGrid").innerHTML;
//             var a = window.open('', '', 'height=500, width=500');
//             a.document.write('<html>');
//             a.document.write('<body > <h1>Div contents are <br>');
//             a.document.write(divContents);
//             a.document.write('</body></html>');
//             a.document.close();
//             a.print();
kk.print()

}
const handlePrint = useReactToPrint({
  content: () => dataGridRef.current,
});

    return(
        <>
  <MyContainer>
     <Grid container>
          <Grid item sm={12}>
          <ComponentToPrint ref={dataGridRef}/>
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
<AiFillPrinter title="Print" onClick={handlePrint} style={{color: "#424343", cursor : "pointer", margin : "2px 8px", border : "1px solid #EBEBEB",
boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)", borderRadius : "10px", padding: "5px", width : "40px", height : "40px" }} />
<GrDocumentText title="pdf" onClick={exportGrid} style={{color: "#696D6E", cursor : "pointer", margin : "2px 8px", border : "1px solid #EBEBEB",
boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)", borderRadius : "10px", padding: "5px", width : "40px", height : "40px" }} />
                </Box>
               <DataGrid 
                //   id="dataGrid"
                //   ref={dataGridRef}
                //   dataSource={ledgerReport}
                  
                //   onCellPrepared={onCellPre}
                //   onRowPrepared={onRowPre}
                 
                //   columnMinWidth={100}
                
                // showColumnLines={false}
                  
                  
                //   noDataText=''
                  id="dataGrid"
     ref={dataGridRef}
                  dataSource={ledgerReport}
  
 
  
  showRowLines = {true}
  onRowPrepared={onRowPre}
  onCellPrepared={onCellPre}
  columnAutoWidth={true}
  columnMinWidth={30}
  showColumnLines = {false}
  columnHidingEnabled={true}
  columnResizingMode="nextColumn"
 
  noDataText=''
  showBorders={false}
                   >
                      <Grouping expandMode="rowClick" />
                <GroupPanel visible={true} /> 
          <Paging enabled={true}  defaultPageSize={15}/>
          <Pager 
           visible={true}
          
           displayMode = "full"
         
           showInfo={true}
           showNavigationButtons = {true} />
        <Column 
         dataField="Date"
        caption="Date"
        dataType = "date"
        format = "dd/MM/yyyy"
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
        caption="Particular"
        width={400}
      >
               <RequiredRule />
        </Column>
        <Column 
       
        caption="Debit"
       allowSorting={true}
        calculateCellValue={TemplateNameCell}>
               <RequiredRule />
        </Column>
        <Column 
       
        caption="Credit"
        allowSorting={true}
        dataType="number"
        calculateCellValue={TemplateNameCell2}
       >
               <RequiredRule />
        </Column>
        <Column 
        dataField="Amount"
        caption="Balance"
        calculateCellValue={TemplateNameCell3}
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