import React, {useState, useEffect} from 'react';
import { Container, Paper, Typography , Select, MenuItem, Grid } from '@mui/material';
import { Grid as DevGrid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { styled, makeStyles } from '@mui/styles';
import axios from 'axios';
import LedgetTopTable from './LedgerTopTable';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
const useStyle = makeStyles((theme) => ({
   
}))
const CustomSelect = () => {
    return(
        <>
        <input type="checkbox" />
        </>
    )
}
const DropDownTypeProvider = props => (
    <DataTypeProvider formatterComponent={CustomSelect} {...props} />
)

    const Ledger = () => {
        const classes = useStyle();
        const [columns, setColumns] = useState([
            {  name : "id", title: "Trading"},
            { name: 'exchange', title: 'Exchange' },
            { name: 'opening', title: 'Opening Balance' },
            { name : "debit", title : "Debit"},
            {name : "creadit", title : "Creadit"},
            {name : "balance", title : "Balance"}
        ])
        const [rows, setRows] = useState([
            { exchange : "NSE-CASH", opening : "6000", debit : "5000", creadit : "8000", balance: "4000" },
            
            {  exchange : "NSE-CASH", opening : "6000", debit : "5000", creadit : "8000", balance: "4000" },
            {exchange : "total", opening : "7000", debit : "191991" , creadit : "11818", balance: "919199"}
          ])
          const [dropdownColumn, setDropDownColumn] = useState(["id"])
        const rowComponent = ({ tableRow, ...restProps }) => {
            return <Table.Row {...restProps} style={{ backgroundColor: "#E1F1FF", color: "#3D3D3D", borderRadius: "10px"
        , fontSize: "20px", lineHeight: "30px" }} />;
          };
      
        
    return(
        <>
        <Container>
            <Paper>
         <LedgetTopTable />
        <Grid container>
            <Grid item sm={3}>

            </Grid>
             <Grid item sm={9}>
             <DevGrid
      rows={rows}
      columns={columns}>
          <DropDownTypeProvider for={dropdownColumn} />
      <Table />
      <TableHeaderRow rowComponent={rowComponent}/>
    </DevGrid>
             </Grid>
        </Grid>
            </Paper>
        </Container>
       </>
    )
}
export default Ledger;