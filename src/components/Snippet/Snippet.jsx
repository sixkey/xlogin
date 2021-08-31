////// IMPORTS //////

//// EXTERNAL ////

// React
import PostPage from "components/PostPage/PostPage";
import useScript from "libs/scripts";
import React, { Fragment } from "react";
import {useRouteData} from "react-static";
import {getSnipPath, getStaticPath} from "../../libs/paths";

//// INTERNAL ////

import "./Snippet.css";

////// COMPONENT //////

const SpoolCanvas = (props) => {
    const { snippetName } = props;

    useScript(getStaticPath(`snippets/${snippetName}/${snippetName}.min.js`));

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

export default function Snippet(props) {
    const { postid } = useRouteData();
    const snippetName = postid.substring(5)
    return (
        <Fragment>
            <SpoolCanvas snippetName={snippetName} link={getSnipPath(postid) + "#post-start"}></SpoolCanvas>
            <a name="post-start"></a>
            <PostPage/>
        </Fragment>
    );

    //// MISC ////
};

