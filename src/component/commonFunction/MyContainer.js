import React from 'react';
import { styled, makeStyles } from '@mui/styles';
import {Box} from "@mui/material";
const MyContainer = (props) => {
    const MyPaper = styled(Box)({
    
        border: "1px solid #FFFFFF",
        boxSizing : "border-box",
        boxShadow : "0px 2px 16px rgba(61, 61, 61, 0.06)",
        borderRadius: "10px"
    })
    return(
      
        <MyPaper>
{props.children}
        </MyPaper>
    )
}
export default MyContainer;