////// IMPORTS //////

//// EXTERNAL ////

// React
import { getStaticPath } from "libs/paths";
import React, { Component, Fragment } from "react";

// Reactstrap
import { Container } from "reactstrap";

//// INTERNAL ////

import "./Gallery.css";

////// COMPONENT //////

class GalleryItem extends Component {
    //// LIFECYCLE ////
    //// RENDERING ////

    render() {
        const { src, logoSrc, link, imgClassName, titleElem } = this.props;

        var foreground = titleElem || logoSrc;

        return (
            <a href={link}>
                <div className="gallery-item m-0 p-0">
                    <img
                        className={`thumbnail ${
                            foreground ? "thumbnail-dark" : ""
                        }`}
                        src={getStaticPath(src)}
                    ></img>
                    {foreground ? (
                        <Fragment>
                            {titleElem ? (
                                <div className="abs-full">{titleElem}</div>
                            ) : (
                                <img
                                    className={"card-logo " + imgClassName}
                                    src={getStaticPath(logoSrc)}
                                ></img>
                            )}
                        </Fragment>
                    ) : null}
                </div>
            </a>
        );
    }

    //// MISC ////
}

////// EXPORTS //////

export default GalleryItem;
