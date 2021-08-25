////// IMPORTS //////

//// EXTERNAL ////

// React
import ErrorPage from "components/ErrorPage/ErrorPage";
import Home from "components/Home/Home";
import PostPage from "components/PostPage/PostPage";
import Snippet from "components/Snippet/Snippet";
import { getStaticPath } from "libs/paths";
import React, { Component, Fragment } from "react";

// Reactstrap
import { Container } from "reactstrap";

//// INTERNAL ////

////// COMPONENT //////

class Router extends Component {
    //// LIFECYCLE ////

    //// RENDERING ////

    render = () => {
        if (!this.props.location) {
            return null;
        }

        var query = new URLSearchParams(this.props.location.search);
        var type = null;

        if (!query.has("type") || query.has("hashtag")) {
            for (var key of query.keys()) {
                if (key != "hashtag") {
                    query.delete(key);
                }
            }

            var path = query.toString();
            if (path != "") {
                path = "?" + path;
            }

            window.history.pushState(null, null, getStaticPath(path));
            return (
                <Home
                    hashtag={query.has("hashtag") ? query.get("hashtag") : null}
                ></Home>
            );
        }

        var type = query.get("type");

        if (!["post", "snippet"].includes(type)) {
            return <ErrorPage error="Invalid url"></ErrorPage>;
        }

        return (
            <Fragment>
                {type == "post" ? (
                    <PostPage postid={query.get("id")}></PostPage>
                ) : type == "snippet" ? (
                    <Snippet id={query.get("id")}></Snippet>
                ) : (
                    <ErrorPage error="Invalid url"></ErrorPage>
                )}
            </Fragment>
        );
    };

    //// MISC ////
}

////// EXPORTS //////

export default Router;
