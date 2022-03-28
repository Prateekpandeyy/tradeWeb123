import React, { useState, useEffect } from "react";
import {
  Paper,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import { styled, makeStyles } from "@mui/styles";
import moment from 'moment';
import {
  DataGrid,
  Column,
  Summary,
  TotalItem,
  Selection,
 
} from "devextreme-react/data-grid";
import BottomLedger from "./BottomLedger";
import ChartComp from "./ChartComp";
import { baseUrl } from "../baseUrl/BaseUrl";
import axios from "axios";
import Layout from "../Layout/Layout";
import MyContainer from "../commonFunction/MyContainer";
import "devextreme/dist/css/dx.light.css";
import CustomTypography from '../commonFunction/CustomTypography';
const useStyle = makeStyles({
  boxRoot: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  MySelect: {
    display: "flex",
    width: "100px",
    height: "30px",
    background: "#ffffff",
    border: "1px solid #EBEBEB",

    boxShadow: "0px 2px 16px rgb(61 61 61 / 6%)",
    borderRadius: "7px",

    fontSize: "16px",
    margin: "5px auto",
  },
  MySelect2: {
    display: "flex",
    width: "200px",
    height: "40px",
    background: "#ffffff",
    border: "1px solid #EBEBEB",
    boxShadow: "0px 2px 16px rgb(61 61 61 / 6%)",
    borderRadius: "7px",
    padding: "0 10px",
    margin : "0 0 0 15px",
    fontSize : "12px !important",
    fontStyle : "normal !important",
    fontFamily :"Poppins !important",
    lineHeight : "27px !important", 
    color : "#3D3D3D !important",
    fontWeight : "600 !important",
    letterSpacing :"1.3px"
  },
});
const TopBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "20px",
});

const Ledger = () => {
  let tradeval = []

  const [searchDate, setSearchDate] = useState({
    fromDate: "20210401",
    toDate: "20220331",
  });
  const [date, setDate] = useState([]);
  const [debit, setDebit] = useState(67);
  const [creadit, setCreadit] = useState();
  const [balance, setBalance] = useState();
  const [tradeValue, setTradeValue] = useState("1");
  const [detData, setDetData] = useState([]);
  const [checkValue, setCheckValue] = useState([]);
  const [selectValue, setSelectValue] = useState();
  const classes = useStyle();
  
  useEffect(() => {
    getDate();
  
  }, [searchDate]);
 useEffect(() => {
   getBottomData()
 }, [checkValue])
  const chartData = [
    {
      data: "Credit",
      value: creadit,
    },
    {
      data: "Debit",
      value: debit,
    },
    {
      data: "Balance",
      value: balance,
    },
  ];
 
  const getSelectData = (e) => {
    if (e.length > 0) {
    
      const details = {
        fromDate: searchDate.fromDate,
        toDate: searchDate.toDate,

        type_exchseg: e,
      };
      axios({
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        url: `${baseUrl}/Main/Ledger_Detail`,
        data: details,
      }).then((res) => {
        getledData(res.data);
      });
    } else {
      getledData([]);
    }
  };
    
  let kk = [];
  const getledData = (e) => {
    kk.push(e);
    setDetData(e);
  };

  // select year function
  const finincialYear = (e) => {
    setSelectValue(e.target.value);
    setCheckValue([]);
    setDetData([]);
    if (e.target.value === "1") {
      setSearchDate({
        toDate: "20210331",
        fromDate: "20200401",
      });
    } else if (e.target.value === "2") {
      setSearchDate({
        toDate: "20200331",
        fromDate: "20190401",
      });
    } else if (e.target.value === "3") {
      setSearchDate({
        toDate: "20190331",
        fromDate: "20180401",
      });
    }
  };
  const RenderTitleHeader = () => {
    return (
      <select
        className={classes.MySelect}
        value={tradeValue}
        onChange={(e) => tradeFun(e)}
      >
        <option value={1}>Equity</option>
        <option value={2}> Commodity </option>
      </select>
    );
  };
  const TemplateNameCell = (e) => {
    let aka;

    if (checkValue.includes(e.rowIndex)) {
      aka = true;
    } else {
      aka = false;
    }

    return (
     <>
     {e.row.data.Type !== "Total" ? 
      <span style={{display : "flex", padding : "6px 0px"}}>
      {aka === true ? (
        <input
          type="checkbox"
          onChange={() => valueFun(e.row)}
          
          checked={true}
          className="checked"
        ></input>
      ) : (
        <input
          type="checkbox"
          onChange={() => valueFun(e.row)}
        
          checked={false}
          className="checked"
        ></input>
      )}
    </span> : ""}
     </>
    );
  };
  const valueFun = (e) => {
   
    let pp = [...checkValue];
    let ko = pp.filter((i) => {
      return i === e.rowIndex;
    });
    if (ko.length > 0) {
      pp = pp.filter((i) => {
        return i !== e.rowIndex;
      });
    } else {
      pp.push(e.rowIndex);
    }

    setCheckValue(pp);
    // getSelectData(e);
  };
  const tradeFun = (e) => {
  
    let a = 0;
    let bb = []
    if(e.target.value === "1"){
      a = 3
    }
    else if (e.target.value === "2"){
      a = 0
    }
    setTradeValue(e.target.value);
    setCheckValue([]);
    axios
      .get(
        `${baseUrl}/Main/Ledger_Summary?type=${e.target.value}&fromDate=${searchDate.fromDate}&toDate=${searchDate.toDate}`,
        myConfig
      )
      .then((res) => {
     
        if (res.status === 200) {
      res.data.map((i) => {
       
      if(e.target.value === "1"){
       
        if(i.Type === "Trading"){
         
          bb.push(a++)
        }
       
      }
      else if(e.target.value === "2"){
        bb.push(a++)
      }
      })
        }
      });
      setCheckValue(bb)
  };

  const onRowPre = (e) => {
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
  };

  const myBuyAmount = (e) => {
    let k = parseFloat(e.value).toFixed(2);
    return k;
  };
  const myBuyAmount2 = (e) => {
    let k = parseFloat(e.value).toFixed(2);
    setBalance(k);
    return k;
  };
  const myBuyAmount3 = (e) => {
    let k = parseFloat(e.value).toFixed(2);
    setDebit(k);
    return k;
  };

  const myBuyAmount4 = (e) => {
    let k = parseFloat(e.value).toFixed(2);
    setCreadit(Math.abs(k));
    return Math.abs(k);
  };

  const token = localStorage.getItem("token");
  const myConfig = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  
  const getDate = () => {
    let inc = 2;
  
    axios
      .get(
        `${baseUrl}/Main/Ledger_Summary?fromDate=${searchDate.fromDate}&toDate=${searchDate.toDate}`,
        myConfig
      )
      .then((res) => {
        if (res.status === 200) {
         process(res.data)
       
          res.data.map((i) => {
           if(i.Type === "Trading"){
            
               inc++;
               let p = String(inc)
               tradeval.push(inc)
           }
          })
          setCheckValue(tradeval)
        }
      });
     
    getBottomData()
   
  };
  const onSelectionChanged = (e) => {
    e.component.refresh(true);
  };
  // opening balance right align function
  const balanceFun = (e) => {
    return parseFloat(Math.abs(e.OpeningBalance)).toFixed(2);
  };
  // credit function
  const creditFun = (e) => {
    return parseFloat(Math.abs(e.Credit)).toFixed(2);
  };
  // debit function
  const debitFun = (e) => {
    return parseFloat(Math.abs(e.Debit)).toFixed(2);
  };
  // balance fun
  const totalFun = (e) => {
    return parseFloat(e.Balance).toFixed(2);
  };
  // bottom ledger data 
  const getBottomData = () => {
  
    let cescds = [];
   
    for (let i in checkValue) {
      cescds.push({
        type: date.data[checkValue[i]].Type,
        exchseg: date.data[checkValue[i]].CESCD,
      });
    }
    getSelectData(reduce(cescds));
  

  }

  const reduce = (arr) => {
    let newArray = [];

    const checkValueAvailability = (toFind) => {
      let found = newArray.findIndex((item2) => {
        return item2.type == toFind.type;
      });

      if (found !== -1) {
        return found;
      } else {
        return null;
      }
    };

    arr.forEach((item) => {
      let foundIndex = checkValueAvailability(item);

      foundIndex = foundIndex == null ? null : foundIndex.toString();

      if (foundIndex) {
        newArray[foundIndex] = {
          type: item.type,
          exchseg: [...newArray[foundIndex].exchseg, item.exchseg],
        };
      } else {
        newArray.push({
          type: item.type,
          exchseg: [item.exchseg],
        });
      }
    });
    return newArray;
   
  };
  const process = (arr) => {
    let groupedData = {};
    let totalData = {};
    let outputDataArray = [];
    let typesArray;
  
    //GROUPING DATA
    arr.forEach((element) => {
      if (!groupedData[element.Type]) {
        groupedData[element.Type] = [element];
      } else {
        groupedData[element.Type] = [...groupedData[element.Type], element];
      }
    });
  
    //LIST OF TYPES
    typesArray = Object.getOwnPropertyNames(groupedData);
  
    //SUMATION OF GROUPED DATA
    typesArray.forEach((element, index) => {
      totalData[element] = {
        Type: "Total",
        ExchSeg: "Total",
        CESCD: "",
        OpeningBalance: parseFloat(
          groupedData[element]
            .reduce((prevItem, item) => {
              return prevItem + item.OpeningBalance;
            }, 0)
            .toFixed(2)
        ),
        Debit: parseFloat(
          groupedData[element]
            .reduce((prevItem, item) => {
              return prevItem + item.Debit;
            }, 0)
            .toFixed(2)
        ),
        Credit: parseFloat(
          groupedData[element]
            .reduce((prevItem, item) => {
              return prevItem + item.Credit;
            }, 0)
            .toFixed(2)
        ),
        Balance: parseFloat(
          groupedData[element]
            .reduce((prevItem, item) => {
              return prevItem + item.Balance;
            }, 0)
            .toFixed(2)
        ),
      };
  
      //CONSOLIDATED DATA ----[actual_data , total]
      outputDataArray = [...outputDataArray, ...groupedData[element], totalData[element]];
    });
  setDate({
    types: typesArray,
    data: outputDataArray,
  })
    return {
      types: typesArray,
      data: outputDataArray,
    };
  };
// cell styleling
const cellPrepered = (e) => {

  if(e.rowType === "data" && e.data.Type === "Total"){

    if(e.columnIndex === 1 || e.columnIndex === 2 || e.columnIndex === 4){
      e.cellElement.style.color = "#0085ff";
      e.cellElement.style.fontWeight = 600;
      e.cellElement.style.fontSize = "12px";
      e.cellElement.style.fontFamily = "Poppins";
      e.cellElement.style.lineHeight = "30px"
    }
    else if(e.columnIndex === 3){
      e.cellElement.style.color = "#e2a705";
      e.cellElement.style.fontWeight = 600;
      e.cellElement.style.fontSize = "12px";
      e.cellElement.style.fontFamily = "Poppins";
      e.cellElement.style.lineHeight = "30px"
    }
    else if (e.columnIndex === 5){
      e.cellElement.style.color = "#00b824";
      e.cellElement.style.fontWeight = 600;
      e.cellElement.style.fontSize = "12px";
      e.cellElement.style.fontFamily = "Poppins";
      e.cellElement.style.lineHeight = "30px"
    }
  }
}
// Opening balance
const calculateSelectedRow = (options) => {
 
     
                               
                                          
  if (options.name === 'OpeningBalance') {

    if (options.summaryProcess === 'start') {
      options.totalValue = 0;
    } else if (options.summaryProcess === 'calculate') {

     
    
      if(options.value.Type !== "Total"){
        options.totalValue += options.value.OpeningBalance;
      }
      
    }
  
  } 
  if (options.name === 'Debit') {

    if (options.summaryProcess === 'start') {
      options.totalValue = 0;
    } else if (options.summaryProcess === 'calculate') {

      if(options.value.Type !== "Total"){
        options.totalValue += options.value.Debit;
      }
      
    }
  
  } 
  if (options.name === 'Credit') {

    if (options.summaryProcess === 'start') {
      options.totalValue = 0;
    } else if (options.summaryProcess === 'calculate') {
 
      if(options.value.Type !== "Total"){
        options.totalValue += options.value.Credit;
      }
      
    }
  
  } 
  if (options.name === 'Balance') {

    if (options.summaryProcess === 'start') {
      options.totalValue = 0;
    } else if (options.summaryProcess === 'calculate') {
 
      if(options.value.Type !== "Total"){
        options.totalValue += options.value.Balance;
      }
      
    }
  
  } 

}
  
  return (
    <>
      <Layout mainLink="BP EQUTIES PVT. LTD" subLink="Ledger">
        <MyContainer>
          <TopBox>
            <Typography variant="h4">Ledger</Typography>
            <Box className={classes.boxRoot}>
              {/* <Typography variant="body1" mx={2}>
                Summary for the financial year :
              </Typography> */}
            <CustomTypography>
            Summary for the financial year :  
              </CustomTypography>
              <select
                className={classes.MySelect2}
                onChange={(e) => finincialYear(e)}
                value={selectValue}
              >
                <option value="1">2021-2022</option>
                <option value="2">2020-2021</option>
                <option value="3">2019-2020</option>
              </select>
            </Box>
          </TopBox>
          <Grid container style={{ padding: "20px" }}>
            <Grid item sm={3}>
              <ChartComp chartData={chartData} />
            </Grid>
            <Grid item sm={9}>
<Paper sx={{padding: "0 10px"}}>

                <DataGrid
  id="gridContainer"
 onCellPrepared={cellPrepered}
  onSelectionChanged={onSelectionChanged}
  dataSource={date.data}
  keyExpr="ExchSeg"
  showRowLines = {true}
  onRowPrepared={onRowPre}
  columnAutoWidth={true}
  columnMinWidth={30}
  showColumnLines = {false}
  columnHidingEnabled={true}
  columnResizingMode="nextColumn"
 
  noDataText=''
  showBorders={false}>
                <Selection
                  mode="multiple"
                  allowSelectAll={false}
                  showCheckBoxesMode="none"
                />

                <Column
                  headerCellRender={RenderTitleHeader}
                  cellRender={TemplateNameCell}
                ></Column>

                <Column dataField="ExchSeg" caption="ExchSeg"></Column>

                <Column
                  dataField="OpeningBalance"
                  caption="Opening Balance"
                 calculateCellValue={balanceFun}
                  alignment="right"
                ></Column>

                <Column
                  dataField="Debit"
                  caption="Debit"
                calculateCellValue={debitFun}
                  alignment="right"
                ></Column>

                <Column
                  dataField="Credit"
                  caption="Credit"
               calculateCellValue={creditFun}
                  alignment="right"
                ></Column>

                <Column
                  dataField="Balance"
                  caption="Balance"
                  calculateCellValue={totalFun}
                  alignment="right"
                ></Column>

<Summary calculateCustomSummary={calculateSelectedRow}>
                  <TotalItem
                    cssClass={"openingBalance"}
                    displayFormat="Total"
                    showInColumn="ExchSeg"
                  />
                  <TotalItem
                    name="OpeningBalance"
                    summaryType="custom"
                    customizeText={myBuyAmount}
                    displayFormat="{0}"
                    cssClass={"openingBalance"}
                    showInColumn="OpeningBalance"
                  />
                  <TotalItem
                    name="Debit"
                    summaryType="custom"
                    customizeText={myBuyAmount3}
                    displayFormat="{0}"
                    cssClass={"debitBalance"}
                    showInColumn="Debit"
                  />
                  <TotalItem
                      name="Credit"
                      summaryType="custom"
                    customizeText={myBuyAmount4}
                    displayFormat="{0}"
                    cssClass={"creditBalance"}
                    showInColumn="Credit"
                  />
                  <TotalItem
                     name="Balance"
                     summaryType="custom"
                    customizeText={myBuyAmount2}
                    displayFormat="{0}"
                    cssClass={"totalBalance"}
                    showInColumn="Balance"
                  />
                </Summary>
              </DataGrid>
</Paper>
            </Grid>
          </Grid>
        </MyContainer>
        <Grid container>
          <Grid item sm={12} style={{ padding: "0px 20px" }}>
            <BottomLedger ledgerReport={detData} />
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};
export default Ledger;
