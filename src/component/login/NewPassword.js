import React from 'react';
import {Grid, Card, Button,  Container, Box , Typography, Paper, CardHeader} from '@mui/material';
import style from './style.module.css';
import { styled, makeStyles } from '@mui/styles';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import {baseUrl} from "../baseUrl/BaseUrl";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ResetPass from './ResetPass';
import loginImg from '../ledger/lgoinImg.png';

const useStyle = makeStyles({
    rightAlign : {
        display: "flex",
        justifyContent: "flex-end"
    },
    rootDiv : {
                 display: "flex",
                 width : "50px",
                 border: "2px solid #0364BE"
             },
    logoType : {
        margin: "0px 8px",
        fontFamily: "Montserrat", 
        fontWeight: 600,
        fontStyle: "normal",
        fontSize: "24px",
        lineHeight: "30.48px"
    },
    logoStyle : {
        display: "flex",
        width: "35px",
        height : "35px",
        borderRadius : "50%",
        backgroundColor : "#0085ff",
        margin : "auto 10px"
    }, 
    logo : {
display : "flex",
justifyContent : "center"
    },
    passBox: {
        position: "relative",
        display : "flex",
        justifyContent : "center",
        alignItems :"center",
    },
    passSign: {
        position : "absolute",
        right: "3px",
        color : "rgba(204, 204, 204, 0.8)"
    }
})
const MyLabel = styled(Typography)({
    fontFamily: "Montserrat", 
    fontWeight: 600,
    fontStyle: "normal",
    fontSize: "14px",
    lineHeight: "27px"
  });
const NewPassword = () => {
    const [isPasswordShow, setIsPasswordShow] = useState(false)
    const [isConfirmPass, setIsConfirmPass] = useState(false)
    const [otp, setOtp] = useState()
    const [password, setPassword] = useState();
    const [newPassword, setNewPassword] = useState()
    const userId = localStorage.getItem("userId");
   const classes = useStyle()
   const { handleSubmit, register, errors } = useForm({
   
  });
let history = useNavigate()
   const onSubmit = (value) => {
     console.log(userId)
    
    var data4 = JSON.stringify({
      "userId" : userId,
      "OTP" : otp,
      "newPassword" : password,
      
  })
  
    axios({
      method : "POST", 
      url : `${baseUrl}/TradeWeb/Login_update_password?userId=${userId}&OTP=${otp}&newPassword=${password}`, 
      headers: { 
       'Content-Type': 'application/json'
     },
      data : data4
  })
  .then((res) => {
    console.log("res", res.data.status)
    if(res.data.status === true){
     Swal.fire({
       title : "success", 
       html : "Password updated successfully",
       icon : "success"
     })
     history("/")
    }
  })
     
   }
   const otpFun = (e) => {
     setOtp(e.target.value)
   }
   //Toggle password
   const togglePasssword = () => {
       setIsPasswordShow(!isPasswordShow)
   } 
   // confimt password function 
  const confirmPassFun = () => {
      setIsConfirmPass(!isConfirmPass);
  }
  // get password function 
  const getPassword = (e) => {
    setPassword(e.target.value)
  } 
  // get new password function 
  const getNewPassword = (e) => {
    setNewPassword(e.target.value)
  }
 return(
    <>
   <Container maxWidth = "md" className={style.myContainer}>
       <Grid container sx={{border: "1px solid #ccc"}}>
          <Grid item sm = {6}>
          <Box className={style.leftContent}>
          <img src={loginImg} style={{width: "100%", height: "100%"}} />
           </Box>
          </Grid>
          <Grid item sm = {6}>
             <Box p = {4}>
             <Card align="left" sx={{minHeight: "368px"}}>
            <Box className={classes.logo}>
            <div className={classes.logoStyle}></div>
                 <Typography variant="h4" className={classes.logoType}>
                 Logo
                    
                 </Typography>
            </Box>
              
               <>
                 <CardHeader 
                 title={
                     <>
                    <Typography style={{fontSize: "34px", fontWeight: "600", fontStyle: "normal",
                    fontFamily: "Montserrat",
                lineHeight: "41.45px", color: "#3D3D3D"}}>
                      Set New Password
                    </Typography>
                 <div className={classes.rootDiv}>

                 </div>
                     </>
                 }/>
            <form style={{padding: "16px"}} onSubmit= {(handleSubmit(onSubmit))}>
              <Grid item sm={12}>
              <MyLabel>OTP</MyLabel>
          
          
          <input
                        type="number"
                        className="form-control"
                        name="p_password"
                       onChange={(e) => otpFun(e)}
                        placeholder="Enter OTP"
                      
                       
                      />
                     
              </Grid>
            <Grid item sm = {12}>
            <MyLabel>Password</MyLabel>
          
          <Box className={classes.passBox}>
          <input
                        type={isPasswordShow ? "text" : "password"}
                        className="form-control"
                        name="p_password"
                       autoComplete="new-password"
                        placeholder="Enter Password"
                      onChange = {(e) => {getPassword(e)}}
                        onCopy={(e) => {
                          e.preventDefault();
                          return false
                        }}
                        onPaste={(e) => {
                          e.preventDefault();
                          return false
                        }}
                      />
                     
           <span onClick={togglePasssword} className={classes.passSign}>{isPasswordShow ? <RemoveRedEyeIcon/>  : <VisibilityOffIcon/> } </span>
                      
          </Box>   
              </Grid>
              <Grid item sm = {12} pt = {2} pb={2}>
                
                <MyLabel>Confirm Password</MyLabel>
          
          <Box className={classes.passBox}>
          <input
                        type={isConfirmPass ? "text" : "password"}
                        className="form-control"
                        name="p_confirmpassword"
                       autoComplete="new-password"
                        placeholder="Enter Password"
                      onChange={(e) => getNewPassword(e)}
                        onCopy={(e) => {
                          e.preventDefault();
                          return false
                        }}
                        onPaste={(e) => {
                          e.preventDefault();
                          return false
                        }}
                      />
                     
           <span onClick={confirmPassFun} className={classes.passSign}>{isConfirmPass ? <RemoveRedEyeIcon/>  : <VisibilityOffIcon/> } </span>
                      
          </Box>
                </Grid>
           
          
                    <Button color="primary" type="submit" variant="contained">Reset Password</Button>
            </form></>
             </Card>
             </Box>
          </Grid>
       </Grid>


   </Container>
    </>
 )
}
export default NewPassword;       