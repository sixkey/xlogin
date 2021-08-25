////// IMPORTS //////

//// EXTERNAL ////

// Emoji
import emoji from "react-easy-emoji";

// React
import React, { Component, Fragment } from "react";

// Reactstrap
import { Container } from "reactstrap";

//// INTERNAL ////
import "./Footer.css";
////// COMPONENT //////

class Footer extends Component {
    //// LIFECYCLE ////
    //// RENDERING ////
    render() {
        return <div className="w100 py-5 footer">{this.randomFooter()}</div>;
    }

    randomFooter = () => {
        const value = Math.round(Math.random() * 1000);

        switch (value % 3) {
            case 0:
                return <span>made with love {emoji("❤️")}</span>;
            case 1:
                return <span>holy c &gt; c &gt; cpp</span>;
            case 2:
                return (
                    <span>
                        if only there was a different footer each time you
                        refresh
                    </span>
                );
            default:
                return <span>something went wrong {emoji("😔")}</span>;
        }
    };
    //// MISC ////
}

////// EXPORTS //////

export default Footer;
