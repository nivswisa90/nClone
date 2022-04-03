import React, {useState} from 'react'
import axios from "axios";
import {useQuery} from "react-query";

import AddComment from "./AddComment";
import img2 from '../../media/img2.jpg'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {IconButton} from "@mui/material";

import {FaAngleDown, FaAngleUp} from "react-icons/fa";
import {toast, ToastContainer} from "react-toastify";


async function fetchComments() {
    const {data} = await axios.get('http://localhost:3000/comments')

    return data
}


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Comment = () => {

    const [vote, setVote] = useState(0)
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const {data, error, isError, isLoading} = useQuery('comments', fetchComments)

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error! There is no comments {error.message}</div>
    }

    const incVote = (value) => {
        let vote = parseInt(value.votes)
        vote += 1
        value.votes = vote.toString()
        setVote(vote)
    }

    const decVotes = (value) => {
        let vote = parseInt(value.votes)
        if(vote > 0){
            vote -= 1
            value.votes = vote.toString()
            setVote(vote)
        }
        else{
            toast.error('Unable to vote anymore!', {
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
    // m-5 py-10 px-17 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-5 sm:space-x-6
    return (
        data.map((comment, index) => {
            return (
                <div key={index}
                     className="inline-grid grid-cols-1 gap-5 m-5 bg-white rounded-xl shadow-lg sm:py-4 sm:items-center sm:space-y-5 sm:space-x-6">
                    <img className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0" src={img2}
                         alt="landscape"/>
                    <div className="text-center space-y-2 sm:text-left">
                        <div className="space-y-0.5">
                            <p className="text-m text-black font-semibold">
                                {comment.title}
                            </p>
                            <p className="text-slate-500 font-medium">
                                Submitted at {comment.postedAt} by
                                <span className="text-slate-500 font-bold"> {comment.name}</span>
                            </p>
                            <p className="text-slate-500 font-bold">{comment.comments} Comments</p>
                        </div>
                        <div>
                            <IconButton onClick={() => (incVote(comment))}>
                                <FaAngleUp/>
                            </IconButton>
                            <span>{vote && comment.id === index ? vote : comment.votes}</span>
                            <IconButton onClick={() => (decVotes(comment))}>
                                <FaAngleDown/>
                            </IconButton>
                            <ToastContainer />
                        </div>

                        <div>
                            <Button  onClick={handleOpen}>Add Comment</Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <AddComment flag={true}/>
                                </Box>
                            </Modal>
                        </div>

                    </div>
                </div>
            )
        })


    )
}
export default Comment