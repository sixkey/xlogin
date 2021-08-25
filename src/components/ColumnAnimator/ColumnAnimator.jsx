////// IMPORTS //////

//// EXTERNAL ////

// React
import React, { Component, Fragment } from "react";
import { Animated } from "react-animated-css";

// Reactstrap
import { Container } from "reactstrap";

//// INTERNAL ////

////// COMPONENT //////

class ColumnAnimator extends Component {
    //// LIFECYCLE ////
    //// RENDERING ////

    render = () => {
        let {
            children,
            duration = 300,
            animationIn = "fadeIn",
            animationInDelay = 0,
            animationDelayIncrement = 100,
        } = this.props;

        return (
            <Fragment>
                {children.map((child, index) => (
                    <Animated
                        key={index}
                        duration={duration}
                        animationIn={animationIn}
                        animationInDelay={
                            animationInDelay + index * animationDelayIncrement
                        }
                    >
                        {child}
                    </Animated>
                ))}
            </Fragment>
        );
    };
    //// MISC ////
}

////// EXPORTS //////

export default ColumnAnimator;
