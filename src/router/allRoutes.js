import React from "react";
import {Route, Routes} from "react-router-dom";
import LandingPage from "../components/App/LandingPage"
import CommentsView from "../components/Comments/CommentsView";
import MainPage from "../components/App/MainPage";
import AddComment from "../components/Comments/AddComment";

const ReactRouter = () => {
    return (
        <Routes>
            <Route exact path="/" element={<LandingPage/>}/>
            <Route path="/comments" element={<CommentsView/>}/>
            <Route path="/main" element={<MainPage/>}/>
            <Route path="/add" element={<AddComment/>}/>
        </Routes>
    );
};
export default ReactRouter;
