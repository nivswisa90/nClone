import React from 'react'

import { Container } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

import Login from "../Login/Login";

const useStyles = makeStyles(() => ({
    title: {
        fontSize: 70,
        fontWeight: 90,
    },
}));

const LandingPage = () => {
    const classes = useStyles();
    return(
        <Container>
            <h3 className={classes.title}>Welcome To nClone</h3>
           <Login/>
        </Container>
    )
}
export default  LandingPage