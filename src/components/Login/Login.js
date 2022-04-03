import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

import {makeStyles} from "@material-ui/core/styles";
import {Button, TextField} from "@mui/material";

import {FaAngleRight} from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles(() => ({
    loginWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    loginSubTitle:{
        fontSize: 30,
        fontWeight: 90,
    },
    submitBtn:{
        margin: '3vh',
        color:'black'
    }
}))

const Login = () => {
    const [userName, setUserName] = useState('')

    const navigate = useNavigate()
    const classes = useStyles()

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(userName)
            navigate(`/main`)
        else{
            toast.error('Please enter username first!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <div className={classes.loginWrapper}>
            <h3 className={classes.loginSubTitle}>Please Enter Username</h3>
            <form onSubmit={handleSubmit}>
                <TextField id="outlined-basic"  variant="outlined" onChange={e => setUserName(e.target.value)} />
                <div>
                    <Button className={classes.submitBtn} type="submit">Submit <FaAngleRight/></Button>
                </div>
                <ToastContainer />
            </form>
        </div>
    )
}
export default Login