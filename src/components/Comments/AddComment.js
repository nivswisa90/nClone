import React, {useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import {IconButton, TextField} from "@mui/material";
import axios from "axios";
import {useMutation} from "react-query";
import {toast, ToastContainer} from "react-toastify";
import {Link} from "react-router-dom";
import {FaAngleLeft} from "react-icons/fa";

const formatDate = (date) => {
    let d = new Date(date);
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    let year = d.getFullYear();
    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }
    return [year, month, day].join('-');
}


const useStyles = makeStyles(() => ({
    createContainer: {
        maxWidth: '400px',
        margin: '0 auto',
        textAlign: 'center'
    },
    addCommentBox: {
        display: 'flex',
        borderRadius: '5px',
        flexFlow: 'wrap',
        border: '1px solid black',
        '& div': {
            margin: '3px',
            '& label': {
                fontSize: '20px',
                color: '#f1356d',
                marginBottom: '30px',
                fontFamily: 'Roboto Mono',
                contrastText: "black",
            }
        }
    },
    title: {
        fontFamily: 'Roboto Mono',
        contrastText: "black",
        fontSize: '35px',
    },
    btn: {
        marginLeft: '115px',
        fontFamily: 'Roboto Mono',
        contrastText: "black",
        fontSize: '20px',
    }

}))
const AddComment = (props) => {
    const classes = useStyles();
console.log(props)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('')
    let date = new Date().toString()
    date = formatDate(date)

    const {isLoading, isError, error, mutate} = useMutation('comments', postComment)

    async function postComment(comment) {
        const response = await axios.post('http://localhost:3000/comments', comment)
        setMessage(response.data)
    }

    function addComment() {
        if (name && title && email) {
            mutate({id: Date.now(), name, title, email, postedAt: date, comments: 0, votes: 0})
            toast.success('Added successfully!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else
            toast.error('Please fill out all inputs!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
    }

    return (
        <div className={classes.createContainer}>
            <h3 className={classes.title}>Add a New Comment</h3>
            <form className={classes.addCommentBox}>
                <div>
                    <label>Name:</label>
                    <TextField id="outlined-basic" variant="outlined" onChange={e => setName(e.target.value)}/>
                </div>
                <div>
                    <label>Title:</label>
                    <TextField id="outlined-basic" variant="outlined" onChange={e => setTitle(e.target.value)}/>
                </div>
                <div>
                    <label>Email:</label>
                    <TextField id="outlined-basic" variant="outlined"
                               onChange={e => setEmail(e.target.value)}/>
                </div>
                <button className={classes.btn} onClick={addComment} type='button'>Add Comment</button>
            </form>
            <div>
                {props.flag ? "" :<Link to='/main'>
                    <IconButton>
                        <FaAngleLeft/> Back
                    </IconButton>
                </Link> }

                <ToastContainer/>
                {isLoading
                    ? "Saving..." : ""
                }
                {
                    isError
                        ? error.message : ""
                }
            </div>

        </div>
    )
}
export default AddComment