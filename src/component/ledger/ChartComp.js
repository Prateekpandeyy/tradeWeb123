import * as React from 'react';
import Paper from '@mui/material/Paper';
import PieChart, {
  Legend,
  Export,
  Series,
  Label,
  Size,
  Font,
  Connector,
  Border,
} from 'devextreme-react/pie-chart';
import { Animation } from
 '@devexpress/dx-react-chart';

import {Box} from "@mui/material";
import { styled } from '@mui/styles';
const data = [
  { country: 'Russia', area: 12 },
  { country: 'Canada', area: 1 },
  { country: 'USA', area: 7 },
  
];
const MySeries = styled(Box)({
  display: "flex", 
  width: "100%",
  justifyContent : "flex-start",
  flexDirection: "column"
})
const RedBox = styled(Box)({
  display: "flex", 
  width: "10px",
  height: "10px", 
  borderRadius: "50%",
  backgroundColor: "red",
  margin: "10px"
})
const GreenBox = styled(Box)({
  display: "flex", 
  width: "10px",
  height: "10px", 
  borderRadius: "50%",
  backgroundColor: "green",
  margin: "10px"
})
const BlueBox = styled(Box)({
  display: "flex", 
  width: "10px",
  height: "10px", 
  borderRadius: "50%",
  backgroundColor: "blue",
  margin: "10px"
})
const kk = (e) => {
 
  if (e.data.data == "Creadit") {
    return {
        color: "#0054A2",
        
        
    }
}
else if (e.data.data == "Debit") {
  return {
      color: "#E6AA0A",
      border : "2px solid black"
      
  }
}
else if (e.data.data == "Balance") {
  return {
      color: "#00B824",
      border : "2px solid black"
      
  }
}

}
 class ChartComp extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      
    
        creadit : "",
        debit : "",
        balance : ""
      
    };
  }
  pieChartAttributes = {
    id: 'elementId',
    class: 'pieClass'
}
  componentDidMount() {
    
    this.props.chartData.map((i) => {
    
      if(i.data === "Creadit"){
        this.setState({creadit : i.value})
      }
      if(i.data === "Debit"){
        this.setState({debit : i.value})
      }
      if(i.data === "Balance"){
    
        this.setState({balance : i.value})
      }
    })
  }
 myText = (e) => {
    console.log("myY", this.props.chartData)
    var name = e.pointName;
           let text;
           
              
                    
                   this.props.chartData.map((i) => {
                    if(i.data === "Creadit"){
                     text = i.value
                    }
                   else if(i.data === "Debit"){
                      text = i.value
                    }
                    else if(i.data === "Balance"){
                  
                      text = i.value                    }
                  })
                   
                
            
            return name + ", area: " + text;
        
   
   
  }

  render() {
  

    return (
      <Paper>
       <Box style={{padding: "10px 20px"}}>
       <PieChart 
       type="doughnut"
        dataSource={this.props.chartData}
        innerRadius={0.65}
       diameter={0.5}
        customizePoint = {kk}
        elementAttr={this.pieChartAttributes}
       
      >
          <Size
                    height={200}
                    width={200}
                />
        <Legend
          orientation="horizontal"
          itemTextPosition="right"
          horizontalAlignment="left"
          verticalAlignment="bottom"
         columnItemSpacing={200}
      customizeText = {this.myText}
       
          /> 
        
         
       
        <Series argumentField="data"  valueField="value">
    <Label customizeText={this.mylabelText} />
            <Font size={16} weight={1000} />
        
         {/* <Border visible={true} solid color="green"/> */}
        </Series>
       
      </PieChart>
  
       </Box>
      </Paper>
    );
  }
}
export default ChartComp;