import React from 'react';
import {Grid, Card, Button,  Container, Box , Typography, Paper, CardHeader} from '@mui/material';
import style from './style.module.css';
import { styled, makeStyles } from '@mui/styles';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ResetPass from './ResetPass';
import loginImg from '../ledger/lgoinImg.png';
import { baseUrl } from '../baseUrl/BaseUrl';
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
        color: "rgba(204, 204, 204, 1)"
    }
})
const MyLabel = styled(Typography)({
    fontFamily: "Montserrat", 
    fontWeight: 600,
    fontStyle: "normal",
    fontSize: "14px",
    lineHeight: "27px"
  });
const Login = () => {
   
    const [showOtp, setShotOpt] = useState(false)
    const [otp, setOpt] = useState()
    const [passWord, getPassWord] = useState("")
    const [userId, setUserId] = useState("")
    const [myToken, getToken] = useState("")
    const [moNumber, setMonumber] = useState();
    const [isPasswordShow, setIsPasswordShow] = useState(false)
    const [showResetPass, setShowResetPass] = useState(false)
    let history = useNavigate()
   const classes = useStyle()
   const { handleSubmit, register, errors } = useForm({
   
  });
   var data4 = JSON.stringify({
    "userId" : userId,
    "password" : passWord
})
var data3 = JSON.stringify({
   "phoneno" : "91" + moNumber,
   "otp" : otp
})
   const onSubmit = (value) => {
     
       let formData = new FormData();
     
      if(otp){
        axios({
            method: "POST",
            url : `https://prod-10.centralindia.logic.azure.com/workflows/e9581b06077b4a09af1c86467d171669/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Mx-U8GIyh0K8cSfBtqVul5hmkNHJ_69VjmppB6N7Uy0`,
            headers: { 
                'Content-Type': 'application/json'
              },
            data: data3
        })
        .then((res) => {
          
            if(res.data.type === "success"){
         axios({
             method : "POST",
             url : `${baseUrl}/TradeWeb/Login_validate_Password?userId=${userId}&password=${passWord}`,
             data : data4
         })
         .then((res2) => {
            
         
            if(res2.data.status === true){
                let a = JSON.parse(res2.data.data)
                console.log('res', a[0].ClientName)
                localStorage.setItem("userName", a[0].ClientName)
                localStorage.setItem("token", res2.data.token)  
             Swal.fire({
                 title: "succews",
                 html :"login successfully",
                 icon : "success"
             })
             history("/tradeweb/lodger")
            }
            else{
                Swal.fire({
                    title : "error",
                    html : `${res2.data.error_message}`,
                    icon : "error"
                })
            }
         })       
        
          
            }
            else{
                Swal.fire({
                    title: "error",
                    html : `${res.data.message}`,
                    icon : "error"
                })
            }
        })
      }
     
   }
 const passFun = (e) => {
     getPassWord(e.target.value)
 }
   const otpAction = (e) => {
       setOpt(e.target.value)
   }
   const getMobileNum = (e) => {
       let mNo = e.target.value.toUpperCase();
     setUserId(mNo)
     localStorage.setItem("userId", mNo)
       axios({
           method : "POST", 
           url : `${baseUrl}/TradeWeb/Login_validate_USER?userId=${mNo}`, 
           headers: { 
            'Content-Type': 'application/json'
          },
           data : mNo
       })
       .then((res) => {
          
         
          if(res.data.message === "success"){
            let a = JSON.parse(res.data.data)
           let bb = a[0].Mobile
           setMonumber(bb)

           var data2 = JSON.stringify({
            "phoneno": "91" + bb
          });
            axios({
                method: "POST",
                url : `https://prod-00.centralindia.logic.azure.com/workflows/a7d7a088db2d41e985861b0509977c77/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5Xl1exEMOMVsctxYVZdHTOhIsQEi5fpWrhQB5dgqUFY`,
                headers: { 
                    'Content-Type': 'application/json'
                  },
                data: data2
            })
            .then((res) => {

                if(res.data.type === "success"){
                    setShotOpt(true)
                }
            })
           }
           else{
               Swal.fire({
                   title : "error", 
                   html : "Incorrect user id",
                   icon : "error"
               })
           }
       })
   }
   const resendOtp = (e) => {
       e.preventDefault()
    var data2 = JSON.stringify({
        "phoneno": "91" + moNumber
      });
        axios({
            method: "POST",
            url : `https://prod-00.centralindia.logic.azure.com/workflows/a7d7a088db2d41e985861b0509977c77/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5Xl1exEMOMVsctxYVZdHTOhIsQEi5fpWrhQB5dgqUFY`,
            headers: { 
                'Content-Type': 'application/json'
              },
            data: data2
        })
        .then((res) => {

            if(res.data.type === "success"){
              Swal.fire({
                  title : "success",
                  html : "An otp has been sent to your number",
                  icon : "success"
              })
            }
        })
   }
   //Toggle password
   const togglePasssword = () => {
       setIsPasswordShow(!isPasswordShow)
   } 
   // Reset password function 
   const resetPass = (e) => {
       e.preventDefault()
       setShowResetPass(true)
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
               {showResetPass ? <ResetPass /> : 
               <>
                 <CardHeader 
                 title={
                     <>
                    <Typography style={{fontSize: "34px", fontWeight: "600", fontStyle: "normal",
                    fontFamily: "Montserrat",
                lineHeight: "41.45px", color: "#3D3D3D"}}>
                        Sign in
                    </Typography>
                 <div className={classes.rootDiv}>

                 </div>
                     </>
                 }/>
            <form style={{padding: "16px"}} onSubmit= {(handleSubmit(onSubmit))}>
            <Grid item sm = {12}>
                
              <MyLabel>User Id</MyLabel>
          <input className="form-control"  type="text" placeholder='Enter your user id' onBlur={(e) => getMobileNum(e)} />
              </Grid>
              <Grid item sm = {12} pt = {2} pb={2}>
                
                <MyLabel>Password</MyLabel>
          
          <Box className={classes.passBox}>
          <input
                        type={isPasswordShow ? "text" : "password"}
                        className="form-control"
                        name="p_password"
                       autoComplete="new-password"
                        placeholder="Enter Password"
                      
                        onCopy={(e) => {
                          e.preventDefault();
                          return false
                        }}
                        onPaste={(e) => {
                          e.preventDefault();
                          return false
                        }}
                        onChange={(e) => passFun(e)}
                      />
                     
           <span onClick={togglePasssword} className={classes.passSign}>{isPasswordShow ? <RemoveRedEyeIcon/>  : <VisibilityOffIcon/> } </span>
                      
          </Box>
         {showOtp ?
          <a href="/" className={classes.rightAlign} onClick={(e) => resetPass(e)}> Forget Password?</a>
         : ""}
               </Grid>
           
           {showOtp && 
            <Grid item sm = {12} pt = {2} pb={2}>
            <MyLabel>Enter your OTP</MyLabel>
          <input className="form-control" type="text" onChange = {(e) => otpAction(e)} placeholder='Enter your otp' />
          <a href="/" className={classes.rightAlign} onClick={(e) => resendOtp(e)}> Resend OTP</a>
                    </Grid>}
                    <Button color="primary" type="submit" variant="contained">Sign in</Button>
            </form></>}
             </Card>
             </Box>
          </Grid>
       </Grid>


   </Container>
    </>
 )
}
export default Login;       