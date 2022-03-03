import React from 'react';
import { Container, Paper, Typography , Select, MenuItem, Box,  Grid } from '@mui/material';
import { styled, makeStyles } from '@mui/styles';
import axios from 'axios';
import {
  Pager, Paging,  DataGrid, Column, RequiredRule } from 'devextreme-react/data-grid';
import MyContainer from '../commonFunction/MyContainer';
import BottomData from './BottomData.js';

const BottomLedger = ({ledgerReport}) => {
    const onRowPre =(e) => {  
      
        e.rowElement.style.backgroundColor = '#E1F1FF';
        e.rowElement.style.fontFamily = 'Poppins';
        e.rowElement.style.fontStyle = "normal";
        e.rowElement.style.fontSize = "16px";
        e.rowElement.style.color = "#3D3D3D";
        e.rowElement.style.fontWeight = 600;
      
        e.rowElement.style.lineHeight = "35px"
           
        }     
     const onCellPre = (e) => {
        
         if (e.columnIndex === 4) {
          
            e.cellElement.style.backgroundColor = "#E1F1FF"
        }
        if(e.columnIndex === 3){
            e.cellElement.style.backgroundColor = "#FFFBEF"
            e.cellElement.style.color = "#E2A705"
        }
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
               
               <DataGrid 
                  id="dataGrid"
                 
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
        
        alignment="center">
               <RequiredRule />
        </Column>
        <Column 
        dataField="creadit"
        caption="Credit"
        alignment="center">
               <RequiredRule />
        </Column>
        <Column 
        dataField="Amount"
        caption="Balance"
        alignment="center">
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