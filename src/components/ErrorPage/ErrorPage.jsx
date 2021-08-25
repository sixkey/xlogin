////// IMPORTS //////

//// EXTERNAL ////

// React
import Hub from "components/Hub/Hub";
import React, { Component, Fragment } from "react";

// Reactstrap
import { Col, Container, Row } from "reactstrap";
import { posts, sections } from "content/posts.json";
import { getStaticPath } from "libs/paths";

//// INTERNAL ////

////// COMPONENT //////

class ErrorPage extends Component {
    //// LIFECYCLE ////
    //// RENDERING ////
    render() {
        return (
            <div className="full-screen">
                <Hub
                    extended={false}
                    posts={posts}
                    sections={sections}
                    renderTitle={() => {
                        return (
                            <div>
                                <a href={getStaticPath("")}>
                                    <img
                                        src={getStaticPath("logo500.png")}
                                        style={{
                                            marginTop: "-8.5em",
                                            height: "8em",
                                        }}
                                        alt=""
                                    />
                                </a>
                                <h1>{this.props.error}</h1>
                            </div>
                        );
                    }}
                ></Hub>
            </div>
        );
    }
    //// MISC ////
}

////// EXPORTS //////

export default ErrorPage;
