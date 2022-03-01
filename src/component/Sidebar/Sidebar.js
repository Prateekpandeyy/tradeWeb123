import React from 'react';
import logoImg from '../../images/PngImages/logo.png';
import documentImg from '../../images/PngImages/document.png';
import homeImg from '../../images/PngImages/home.png';
import bookImg from '../../images/PngImages/book.png';
import arrowImg from '../../images/PngImages/arrow.png';
import { styled, makeStyles } from '@mui/styles';
const Sidebar = () => {
    const useStyle = makeStyles({
        myNav : {
            display: "flex",
            width: "30px",
            height: "30px",
            margin: "15px 8px",
           padding: "5px", 
           cursor: "pointer"
        },
        mainMenu : {
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            padding: "10px 5px",
            backgroundColor: "#ffffff",
            boxShadow : "0px 2px 4px rgba(0, 0, 0, 0.12)"
        }
    })
    const classes = useStyle();
    return(
        <ul className={classes.mainMenu}>
            <li>
                <img src={logoImg} className={classes.myNav} />
                </li>
                <li>
                    <img src={homeImg} className={classes.myNav} />
                </li>
                <li>
                    <img src={documentImg} className={classes.myNav} />
                    </li>
                    <li>
                        <img src={bookImg} className={classes.myNav} />
                    </li>
                    <li>
                        <img src={arrowImg} className={classes.myNav} />
                    </li>
        </ul>
    )
}
export default Sidebar;