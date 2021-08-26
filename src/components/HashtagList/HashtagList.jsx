////// IMPORTS //////

//// EXTERNAL ////

// React
import { getHashtagPath } from "libs/paths";
import React, { Component, Fragment } from "react";

//// INTERNAL ////

////// COMPONENT //////

class HashtagList extends Component {
    //// LIFECYCLE ////
    //// RENDERING ////
    render() {
        const { hashtags } = this.props;

        return (
            <span>
                {hashtags.map((hashtag, index) => (
                    <Fragment key={index}>
                        <a href={getHashtagPath(hashtag)}>
                            <div className="inline">#{hashtag}</div>
                        </a>
                        <span> </span>
                    </Fragment>
                ))}
            </span>
        );
    }
    //// MISC ////
}

////// EXPORTS //////

export default HashtagList;
