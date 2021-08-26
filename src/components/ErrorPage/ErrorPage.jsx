////// IMPORTS //////

//// EXTERNAL ////

// React
import React from "react";
import XLogo from 'components/XLogo/XLogo';
import XHub from "components/Hub/XHub.jsx";
import {useRouteData} from "react-static";

//// INTERNAL ////

////// COMPONENT //////

export default function ErrorPage(props) {
    let { posts, sections } = useRouteData();

    return (
        <div className="full-screen">
            <XHub
                extended={false}
                posts={posts}
                sections={sections}
                renderTitle={() => {
                    return (
                        <div>
                            <div className="header-logo-wrapper">
                                <div className="header-logo" style={{ height: "9em" }}>
                                    <a href="/">
                                        <XLogo code="514391" size="9em" />
                                    </a>
                                </div>
                            </div>
                            <h1>{props.error}</h1>
                        </div>
                    );
                }}
            ></XHub>
        </div>
    );
}
