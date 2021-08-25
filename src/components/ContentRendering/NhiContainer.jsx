////// IMPORTS //////

//// EXTERNAL ////

// React
import React, { Component, Fragment } from "react";

// Reactstrap
import { Container, Collapse } from "reactstrap";

// Nhi
import { makeUrlFriendly, renderTitle } from "./nhi.jsx";

//// INTERNAL ////

////// COMPONENT //////

class NhiContainer extends Component {
    //// LIFECYCLE ////

    constructor(props) {
        super(props);

        this.state = {
            isOpen: props.defaultShow,
        };
    }

    //// RENDERING ////
    render() {
        const {
            title,
            collapse = false,
            level,
            children,
            index = 0,
        } = this.props;

        const collapseButtonId = `button-${level}-${index}-${makeUrlFriendly(
            title
        )}`;

        return (
            <Container className="p-0 py-2">
                {collapse && title ? (
                    <Fragment>
                        <div
                            onClick={() => {
                                this.setState({ isOpen: !this.state.isOpen });
                            }}
                            className="a nhi-h1 d-flex justify-content-between"
                        >
                            {title
                                ? renderTitle(title, level, "", "inline pr-3")
                                : null}
                            <i
                                className={`align-self-center nhi-o6 nhi-hover-o12 fas fa-chevron-${
                                    this.state.isOpen ? "up" : "down"
                                }`}
                            ></i>
                        </div>
                        <Collapse isOpen={this.state.isOpen}>
                            {children}
                        </Collapse>
                    </Fragment>
                ) : (
                    <Fragment>
                        {title ? renderTitle(title, level) : null}
                        {children}
                    </Fragment>
                )}
            </Container>
        );
    }
    //// MISC ////
}

////// EXPORTS //////

export default NhiContainer;
