////// IMPORTS //////

//// EXTERNAL ////

// React
import ErrorPage from "components/ErrorPage/ErrorPage";
import PostPage from "components/PostPage/PostPage";
import useScript from "libs/scripts";
import React, { Component, Fragment } from "react";

// Reactstrap
import { Container } from "reactstrap";

//// INTERNAL ////

import "./Snippet.css";

////// COMPONENT //////

const SpoolCanvas = (props) => {
    const { id } = props;

    useScript(`snippets/${id}/${id}.min.js`);

    return (
        <div id="spool-root" style={{ width: "100%", overflow: "hidden" }}>
            <div className="spool-canvas-godown">
                <a href={props.link}>
                    <i className="fas fa-chevron-down"></i>
                </a>
            </div>
        </div>
    );
};

const Snippet = (props) => {
    const { id } = props;

    if (!id) {
        return <ErrorPage error="Invalid url"></ErrorPage>;
    }

    if (
        ![
            "boids",
            "hunters",
            "hunters2",
            "particles",
            "astar",
            "cars",
        ].includes(id)
    ) {
        return <ErrorPage error="Snippet not found"></ErrorPage>;
    }

    return (
        <Fragment>
            <SpoolCanvas id={id} link={"#post-start"}></SpoolCanvas>
            <a name="post-start"></a>
            <PostPage postid={`snip-${id}`}></PostPage>
        </Fragment>
    );

    //// MISC ////
};

////// EXPORTS //////

export default Snippet;
