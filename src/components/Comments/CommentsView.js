import React from "react";
import {Link} from "react-router-dom";
import Comment from "./comment";

import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@mui/material";


const useStyles = makeStyles(() => ({
    title: {
        fontWeight: 90,
        fontSize: 50,
        fontFamily: 'Roboto Mono',
    },
    subTitles: {
        fontFamily: 'Roboto Mono',
        fontWeight: 90,
    },
    addBtn:{
        position:'absolute',
        top:'10vh',
        border:'1px solid black',
        borderRadius:'5px',

    }
}))

const CommentsView = () => {
    const classes = useStyles();

    return (
        <div>
            <h3 className={classes.title}>comments</h3>
            <Link className={classes.addBtn} to='/add'>
                <Button size="medium">Add New Comment</Button>
            </Link>
            <Comment/>
        </div>
    )
}
export default CommentsView