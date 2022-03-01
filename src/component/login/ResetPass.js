import React from 'react';
import {Grid, Card, Button,  Container, Box , Typography, Paper, CardHeader, CardContent} from '@mui/material';
import { styled, makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
const useStyle = makeStyles({
  
    rootDiv : {
                 display: "flex",
                 width : "50px",
                 border: "2px solid #0364BE"
             },
  rootButton: {
    width: "150px", 
    height: "40px", 
    margin: "20px 10px",
   backgroundColor : "#0364BE",
   color: "#fff",
   boxShadow: " 0px 2px 16px rgba(61, 61, 61, 0.06)",
   borderRadius: "6px"
  }
})
const ResetPass = () => {
    const classes = useStyle()
    let history = useNavigate()
    const resetPassword = (e) => {
history("/new-password")
    }
    return(
       <Card>
             <CardHeader 
                 title={
                     <>
                    <Typography style={{fontSize: "34px", fontWeight: "600", fontStyle: "normal",
                    fontFamily: "Montserrat",
                lineHeight: "41.45px", color: "#3D3D3D"}}>
                        Reset Password
                    </Typography>
                 <div className={classes.rootDiv}>

                 </div>
                     </>
                 }/>
                 <CardContent>
                     <Typography variant="body1">
We are sending you this email, as you have requested a password reset .
Click on the reset button down blow to to create a new password
                     </Typography>
                   <Box m={2}>
                   <Button variant="contained" className={classes.rootButton} onClick={(e) => resetPassword(e)}>Reset</Button>
                   <Typography variant="body2" sx={{margin : "10px 0"}}>
If you did not intiante this request, please get back to us immediately at user@gmail.com
 </Typography>
                   </Box>
                 </CardContent>
       </Card>
    )
}
export default ResetPass;