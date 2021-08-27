////// IMPORTS //////

//// EXTERNAL ////

// React
import React, { Component, Fragment } from "react";

//// INTERNAL ////

import "./Gallery.css";

////// COMPONENT //////

class GalleryItem extends Component {
    //// LIFECYCLE ////
    //// RENDERING ////

    render() {
        const { src, logoSrc, link, className, imageClassName, logoClassName, titleElem } = this.props;

        var foreground = titleElem || logoSrc;

        return (
            <a href={link}>
                <div className={`gallery-item ${className}`}>
                    <img
                        className={`thumbnail ${
                            foreground ? "thumbnail-dark" : ""
                        }`}
                        src={src}
                    ></img>
                    {foreground ? (
                        <Fragment>
                            {titleElem ? (
                                <div className={"abs-full " + imageClassName}>{titleElem}</div>
                            ) : (
                                <img
                                    className={"card-logo " + logoClassName}
                                    src={logoSrc}
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
