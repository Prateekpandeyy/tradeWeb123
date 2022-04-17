import React, {useRef, useState} from 'react';
import {
    DataGrid,
    Grouping,
    GroupPanel,
    Column,
    Selection,
    Paging,
    Summary,
    TotalItem,
    MasterDetail,
    Scrolling,
    Pager,
  } from "devextreme-react/data-grid";
  import { Box, Select, Button, Typography, Grid } from "@mui/material";
  import { styled, makeStyles } from "@mui/styles";
import "antd/dist/antd.css";
import {sales} from './data.js';
import { FaFileCsv } from "react-icons/fa";
import { RiFileExcel2Fill, RiTimeLine } from "react-icons/ri";
import { AiFillPrinter } from "react-icons/ai";
import { GrDocumentText } from "react-icons/gr";
import { AiFillFilePdf } from "react-icons/ai";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { exportDataGrid as exportDataGridToPdf } from "devextreme/pdf_exporter";
import htmlImg from "./../../../images/PngImages/html.png";
import BackDrop from './../../../component/Loader/BackDrop';
import { ComponentToPrint } from "./../../../component/Transaction/ComponentToPrint";
import { DatePicker, Space } from "antd";
import moment from "moment";
const { RangePicker } = DatePicker;
const dateFormat = "DD/MM/YYYY";
const weekFormat = "MM/DD";
const monthFormat = "YYYY/MM";
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
const customFormat = (value) => {
  return `${value.format(dateFormat)}`;
};
const TopBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px",
  });
  const MyData = styled(Box)({
    width: "130px",
    height: "40px",
    borderRadius: "5px",
    border: "1px solid #0364BE",
    padding: "5px 10px",
    color: "#0364BE",
  
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "20px",
    padding: "10px 18px",
    fontSize: "18px",
    boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)",
  });
  const MyButton = styled(Button)({
    borderRadius: "5px",
    backgroundColor: "#0364BE",
    boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)",
    borderRadius: "5px",
    minWidth: "120px",
    height: "35px",
  });
  const useStyle = makeStyles({
    boxRoot: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    MySelect: {
      display: "flex",
      maxWidth: "180px",
      height: "40px",
      background: "#ffffff",
      border: "1px solid #EBEBEB",
      fontFamily:"poppins",
      fontWeight:"bold",
      boxShadow: "0px 2px 16px rgb(61 61 61 / 6%)",
      borderRadius: "7px",
      padding: "0 10px",
      margin: "0 010px 0 0",
      fontSize: "18px",
    },
    MySelect2: {
      display: "flex",
      maxWidth: "300px",
      height: "40px",
      background: "#ffffff",
      border: "1px solid #EBEBEB",
      fontFamily:"poppins",
      fontWeight:"bold",
      boxShadow: "0px 2px 16px rgb(61 61 61 / 6%)",
      borderRadius: "7px",
      padding: "0 10px",
      fontSize: "16px",
    },
  });
  const Content = () => {
    const [toDate, setDate] = useState("20200401");
    const [fromDate, setFromDate] = useState("20210331");
    const getValue = (e) => {
        setDate(e[0].format("YYYYMMDD"));
        setFromDate(e[1].format("YYYYMMDD"));
      };
    const dataGridRef = React.createRef();
    const componentRef = useRef();
      const classes = useStyle()
      const onExporting = (e) => {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet("Main sheet");
        const dataGrid = dataGridRef.current.instance;
        exportDataGrid({
          component: dataGrid,
          worksheet: worksheet,
          customizeCell: function (options) {
            const excelCell = options;
            excelCell.font = { name: "Arial", size: 12 };
            excelCell.alignment = { horizontal: "left" };
          },
        }).then(function () {
          workbook.xlsx.writeBuffer().then(function (buffer) {
            saveAs(
              new Blob([buffer], { type: "application/octet-stream" }),
              "DataGrid.xlsx"
            );
          });
        });
        e.cancel = true;
      };
      const onExportingCsv = (e) => {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet("Main sheet");
        const dataGrid = dataGridRef.current.instance;
        exportDataGrid({
          component: dataGrid,
          worksheet: worksheet,
          customizeCell: function (options) {
            const excelCell = options;
            excelCell.font = { name: "Arial", size: 12 };
            excelCell.alignment = { horizontal: "left" };
          },
        }).then(function () {
          workbook.csv.writeBuffer().then(function (buffer) {
            saveAs(
              new Blob([buffer], { type: "application/octet-stream" }),
              "DataGrid.csv"
            );
          });
        });
        e.cancel = true;
      };
    
      const handlePrint = useReactToPrint({
        content: () => dataGridRef.current,
      });
      const exportGrid = React.useCallback(() => {
        const doc = new jsPDF();
        const dataGrid = dataGridRef.current.instance;
    
        exportDataGridToPdf({
          jsPDFDocument: doc,
          component: dataGrid,
        }).then(() => {
          doc.save("Customers.pdf");
        });
      });
      return (
        <TopBox>
        <Box className={classes.boxRoot} style={{ marginLeft: "-22px" }}>
          <select
            className={classes.MySelect}
            
          >
            <option value={1}>Trades</option>
            <option value={2}> Deliveries</option>
            <option value={3}>Receipts</option>
            <option value={4}>Payments</option>
            <option value={5}>Journals</option>
            <option value={6}>Bills</option>
            <option value={7}>AGTS</option>
            {/* <option value={8}>Mutual Funds</option> */}
          </select>
        
           
          
          <Space
            direction="vertical"
            size={12}
            style={{ display: "flex", width: "300px", margin: "0 20px" }}
          >
            <RangePicker
              defaultValue={[
                moment("04/01/2020", dateFormat),
                moment("31/03/2021", dateFormat),
              ]}
              format={dateFormat}
              onChange={getValue}
            />
          </Space>
        
          <Box className={classes.boxRoot}>
            <MyButton
              variant="contained"
            
              style={{ marginLeft: "5px", height: "60", width: "135px" }}
            >
              Show
            </MyButton>
          </Box>
        </Box>
        <Box className={classes.boxRoot}>
          <FaFileCsv
            onClick={onExportingCsv}
            style={{
              color: "#80BB55",
              margin: "2px 8px",
              fontSize: "30px",
              border: "1px solid #EBEBEB",
              boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)",
              borderRadius: "10px",
              padding: "5px",
              width: "40px",
              height: "40px",
            }}
          />
          <img
            src={htmlImg}
            style={{
              margin: "2px 8px",
              border: "1px solid #EBEBEB",
              boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)",
              borderRadius: "10px",
              padding: "5px",
              maxWidth: "40px",
              maxHeight: "40px",
            }}
          />
          <AiFillFilePdf
            onClick={onExporting}
            style={{
              color: "#107C41",
              margin: "2px 8px",
              border: "1px solid #EBEBEB",
              boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)",
              borderRadius: "10px",
              padding: "5px",
              width: "40px",
              height: "40px",
            }}
          />
          <AiFillPrinter
            onClick={handlePrint}
            style={{
              color: "#424343",
              margin: "2px 8px",
              border: "1px solid #EBEBEB",
              boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)",
              borderRadius: "10px",
              padding: "5px",
              width: "40px",
              height: "40px",
            }}
          />
          <GrDocumentText
            onClick={exportGrid}
            style={{
              color: "#696D6E",
              margin: "2px 8px",
              border: "1px solid #EBEBEB",
              boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)",
              borderRadius: "10px",
              padding: "5px",
              width: "40px",
              height: "40px",
            }}
          />

          <MyData>High Light</MyData>
        </Box>
      </TopBox>
   
      )
  }
  export default Content;