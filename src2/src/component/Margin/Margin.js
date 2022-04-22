import React, { useState, useEffect, useRef } from "react";
import Layout from "../Layout/Layout";
import MyContainer from "../commonFunction/MyContainer";
import style from "./style.module.scss";
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
import axios from "axios";
import { baseUrl } from "../baseUrl/BaseUrl";
import { Box, Select, Button, Typography, Grid } from "@mui/material";
import { styled, makeStyles } from "@mui/styles";
import "antd/dist/antd.css";
import { DatePicker, Space } from "antd";
import moment from "moment";
import { FaFileCsv } from "react-icons/fa";
import { RiFileExcel2Fill, RiTimeLine } from "react-icons/ri";
import { AiFillPrinter } from "react-icons/ai";
import { GrDocumentText } from "react-icons/gr";
import { AiFillFilePdf } from "react-icons/ai";
import htmlImg from "../../images/PngImages/html.png";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
import BackDrop from "../Loader/BackDrop";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { exportDataGrid as exportDataGridToPdf } from "devextreme/pdf_exporter";
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
const customHeaderCell = (data) => {
  const { caption, name } = data?.column;
  return (
    <span
      style={{
        fontSize: "20px",
        fontWeight: "bold",
        lineHeight: "30px",
        fontFamily: "poppins",
      }}
    >
      {caption || name}
    </span>
  );
};
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
    fontFamily: "poppins",
    fontWeight: "bold",
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
    fontFamily: "poppins",
    fontWeight: "bold",
    boxShadow: "0px 2px 16px rgb(61 61 61 / 6%)",
    borderRadius: "7px",
    padding: "0 10px",
    fontSize: "16px",
  },
});
function Margin() {
  const [transactionData, setTransationData] = useState([]);
  const [date22, setStartDate] = useState("01042021");
  const [timeVal, setTimeVal] = useState("1");
  const [toDate, setDate] = useState("20200401");
  const [fromDate, setFromDate] = useState("20210331");
  const [test, setTest] = useState("1");
  const [showTime, setShowTime] = useState(true);
  const [agts, setShowagts] = useState(false);
  const [gal, setGal] = useState("");
  const [agtsVal, setAgtsVal] = useState("C");
  const [transactionAccount, setTransactionAccount] = useState([]);
  const [agtsTransaction, setAgtsTransaction] = useState([]);
  const [marginDate,  setMarginDate] = useState("20212412")
  const [bal, setBal] = useState(0);
  const [ref, setRef] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const classes = useStyle();
  const dataGridRef = React.createRef();
  const componentRef = useRef();
  const { RangePicker } = DatePicker;
  const dateFormat = "DD/MM/YYYY";
  const weekFormat = "MM/DD";
  const monthFormat = "YYYY/MM";
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
  const customFormat = (value) => {
    return `${value.format(dateFormat)}`;
  };
  let bb = 0;
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

  const onRowPre = (e) => {
    if (e.rowType == "header") {
      e.rowElement.style.backgroundColor = "#E1F1FF";
      e.rowElement.style.fontFamily = "Poppins";
      e.rowElement.style.fontStyle = "normal";
      e.rowElement.style.fontSize = "16px";
      e.rowElement.style.color = "#3D3D3D";
      e.rowElement.style.fontWeight = 600;

      e.rowElement.style.lineHeight = "35px";
    }
    if (e.rowType == "data") {
      e.rowElement.style.margin = "10px";
      e.rowElement.style.fontFamily = "Poppins";
      e.rowElement.style.fontStyle = "normal";
      e.rowElement.style.fontSize = "16px";
      e.rowElement.style.color = "#3D3D3D";
      e.rowElement.style.lineHeight = "35px";
      e.rowElement.style.fontWeight = 400;
    }
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
  const mySel = (e) => {
    setTransactionAccount([]);
    setTransationData([]);
    setTest(e.target.value);

    if (e.target.value == 1 || e.target.value == 2) {
      setRef(false);
      setShowTime(true);
      setShowagts(false);
    } else if (e.target.value == 3 || e.target.value == 4) {
      setShowTime(false);
      setRef(true);
    } else if (e.target.value === 5 || e.target.value == 5) {
      setRef(false);
      setShowTime(false);
    } else if (e.target.value == 7) {
      setShowagts(true);
      setRef(false);
    } else {
      setShowTime(false);
    }
  };
  const timeFun = (e) => {
    setTimeVal(e.target.value);
    setTransationData([]);
  };
  // datepicker function
  const dateFun = (e) => {
    let a = e.format("YYYYMMDD");
    setStartDate(a);
  };
  const onSelectionChanged = (e) => {
    e.component.refresh(true);
  };
  return (
    <Layout
      mainLink="BP EQUTIES PVT. LTD >"
      subLink="Margin"
      noBreadcrumb={false}
      showNavigationButtons={false}
    >
      <TopBox>
        <Box className={classes.boxRoot} style={{ marginLeft: "-22px" }}>
          <div className={style.title}>Margin Status As On {marginDate}</div>

          {/* <div className={style.dates}>
            <Box className={classes.boxRoot}>
              <MyData style={{ marginLeft: "20px", fontWeight: "bold" }}>
                <DatePicker
                  defaultValue={moment(new Date(), "DD MMM, YYYY")}
                  defaultPickerValue={moment(new Date(), "DD MMM, YYYY")}
                  format={"DD/MM/YYYY"}
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
                    padding: "0px",
                    fontWeight: "bold",
                  }}
                />
              </MyData>
            </Box>
          </div> */}
          <div className={style.butn}>
            <Box className={classes.boxRoot}>
              <MyButton
                variant="contained"
                style={{ marginLeft: "5px", height: "60", width: "189px" }}
              >
                Pledge For Margin
              </MyButton>
            </Box>
          </div>
        </Box>

        <div className={style.menu}>
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
            <div className={style.hiLi}>
              <MyData> High Light</MyData>
            </div>
          </Box>
        </div>
      </TopBox>
      <Grid container>
        <Grid style={{ padding: "15px", marginLeft: "-30px" }}>
          {/* <DataGrid
            id="dataGrid"
            dataSource={data}
            columnAutoWidth={true}
            allowColumnReordering={true}
            paging={{ pageSize: 6 }}
            showColumnLines={false}
            showBorders={false}
            showRowLines={false}
            wordWrapEnabled={true}
            width="100%"
            selection={{
              mode: "multiple",
              showCheckBoxesMode: "always",
            }}
            scrolling={{
              columnRenderingMode: "standard",
              mode: "standard",
              preloadEnabled: false,
              renderAsync: undefined,
              rowRenderingMode: "virtual",
              scrollByContent: true,
              scrollByThumb: false,
              showScrollbar: "onHover",
              useNative: "auto",
            }}
          > */}
          <DataGrid
            dataSource={data}
            // onRowPrepared={onRowPre}
            // onSelectionChanged={onSelectionHolding}
            alignment="center"
            onRowPrepared={onRowPre}
            showRowLines={true}
            columnAutoWidth={true}
            showColumnLines={false}
            columnHidingEnabled={true}
            allowColumnReordering={true}
            wordWrapEnabled={true}
            showColumnHeaders={true}
            columnResizingMode="nextColumn"
            showBorders={false}
            scrolling={{
              columnRenderingMode: "standard",
              mode: "standard",
              preloadEnabled: false,
              renderAsync: undefined,
              rowRenderingMode: "virtual",
              scrollByContent: true,
              scrollByThumb: false,
              showScrollbar: "onHover",
              useNative: "auto",
            }}
          >
            <Selection mode="multiple" showCheckBoxesMode="always" />
            <Column
              dataField="ExchSegID"
              caption="ExchSeg"
              // cellRender={cellRender}
              alignment="center"
              headerCellRender={customHeaderCell}
            ></Column>
            <Column
              dataField="RequiredID"
              caption="EOD Margin Required "
              headerCellRender={customHeaderCell}
              alignment="center"
            ></Column>
            <Column
              dataField="AvailableID"
              caption="EOD Margin "
              headerCellRender={customHeaderCell}
              alignment="center"
            ></Column>
            <Column
              dataField="ShortFallAmmID"
              caption="ShartFall Amount"
              // cellRender={securityRender}
              headerCellRender={customHeaderCell}
              alignment="center"
            ></Column>
            <Column
              dataField="EODID"
              caption="EOD ShartFall%"
              headerCellRender={customHeaderCell}
              alignment="center"
            ></Column>

            <Column
              dataField="MarginReqID"
              caption="Peack Margin Required"
              headerCellRender={customHeaderCell}
              alignment="center"
            ></Column>
            <Column
              dataField="PeackMarID"
              caption="Peack Margn Collected"
              headerCellRender={customHeaderCell}
              alignment="center"
            ></Column>
            <Column
              dataField="marginAvailablID"
              caption="Peack Margin Available"
              headerCellRender={customHeaderCell}
              alignment="center"
            ></Column>
            <Column
              dataField="MarginShortFallID"
              caption="Peack Margin ShortFall"
              headerCellRender={customHeaderCell}
              alignment="center"
            ></Column>
            <Column
              dataField="PeaMarginHighestID"
              caption="Peack Margin Highest ShaortFall"
              headerCellRender={customHeaderCell}
              alignment="center"
            ></Column>
            {/* <Selection mode="single" showCheckBoxesMode="always" />
            <Grouping contextMenuEnabled={true} />
            <GroupPanel visible={true} allowColumnDragging={true} /> */}
          </DataGrid>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Margin;

const data = [
  {
    ExchSegID: "NSE-FO",
    RequiredID: "268180.50",
    AvailableID: "0.00",
    ShortFallAmmID: "268180.50",
    EODID: "100.00",
    MarginReqID: "23874.00",
    PeackMarID: "119392.00",
    marginAvailablID: "0.00",
    MarginShortFallID: "119392.00",
    PeaMarginHighestID: "268180.50",
  },
  {
    ExchSegID: "BSE-FO",
    RequiredID: "268180.50",
    AvailableID: "0.00",
    ShortFallAmmID: "268180.50",
    EODID: "100.00",
    MarginReqID: "23874.00",
    PeackMarID: "119392.00",
    marginAvailablID: "0.00",
    MarginShortFallID: "119392.00",
    PeaMarginHighestID: "268180.50",
  },
];
