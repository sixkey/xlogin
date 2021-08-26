////// IMPORTS //////

//// EXTERNAL ////

// React
import { getStaticPath } from "libs/paths";
import React, { Component, Fragment } from "react";
import { Animated } from "react-animated-css";

// Reactstrap
import { Container } from "reactstrap";

//// INTERNAL ////

import "./Header.css";
import XLogo from "components/XLogo/XLogo";

////// COMPONENT //////

class Header extends Component {
    //// LIFECYCLE ////

    state = {
        loaded: true,
    };

    //// RENDERING ////
    render() {
        const { links } = this.props;
        const { loaded } = this.state;
        return (
            <Animated isVisible={loaded} animateOnMount={false}>
                <Container className="page-header">
                    <div className="header-logo-wrapper">
                        {/* <img
                            onLoad={() => {
                                this.setState({ loaded: true });
                            }}
                            className="header-logo"
                            src={getStaticPath("logo250.png")}
                            alt=""
                        /> */}
                        <div className="header-logo" style={{ height: "9em" }}>
                            <a href="/">
                                <XLogo size="9em" />
                            </a>
                        </div>
                        <div>
                            <h1 className="mb-0">xkucerak</h1>
                            <div className="text-left link-row">
                                {links.map((link, index) => (
                                    <div key={index}>
                                        <a href={link[1]}>{link[0]}</a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </Animated>
        );
    }
    //// MISC ////
}

////// EXPORTS //////

export default Header;
