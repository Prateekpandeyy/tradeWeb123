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
      
    
     data33 : this.props.chartData
      
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
 
 
 
    var name = e.pointName;
           let text1, text2, text3;
                   this.props.chartData.map((i) => {
                    if(i.data === "Creadit"){
                     text1 = i.value
                    }
                   else if(i.data === "Debit"){
                      text2 = i.value
                    }
                    else if(i.data === "Balance"){
                  
                      text3 = i.value                    }
                  })
 
            if(e.pointIndex == 0){
              name = name + " " + " " + " " + " " + text1
            }
            else  if(e.pointIndex == 1){
              name = name +
           "      " + text2     }
            else  if(e.pointIndex == 2){
              name = name + " " + " " +
                text3            }
           
            return name
  }

  render() {


    return (
      <Paper>
       <Box>
       <PieChart 
       type="doughnut"
        dataSource={this.state.data33}
        innerRadius={0.65}
       diameter={0.5}
        customizePoint = {kk}
        elementAttr={this.pieChartAttributes}
       
      >
          <Size
                    height={200}
                    width={250}
                />
        <Legend
          orientation="horizontal"
          itemTextPosition="right"
          horizontalAlignment="left"
          verticalAlignment="bottom"
         columnItemSpacing={200}
         itemTextPosition = "right"
      customizeText = {this.myText}
    
       
          > 
            <Font size={18} weight={500} />
          </Legend>
        
         
       
        <Series argumentField="data"  valueField="value">
    <Label customizeText={this.mylabelText} />
          
        
         {/* <Border visible={true} solid color="green"/> */}
        </Series>
       
      </PieChart>
  
       </Box>
      </Paper>
    );
  }
}
export default ChartComp;