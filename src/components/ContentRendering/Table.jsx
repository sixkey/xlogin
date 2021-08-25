////// IMPORTS //////

//// EXTERNAL ////

// React
import React, { Component, Fragment } from "react";

// Reactstrap
import { Container } from "reactstrap";

//// INTERNAL ////

////// COMPONENT //////

class Table extends Component {
    //// LIFECYCLE ////
    //// RENDERING ////
    render() {
        return (
            <div>
                {this.props.children.map((child, index) => (
                    <Fragment key={index}>
                        {child}
                        {index < this.props.children.length - 1 ? (
                            <hr></hr>
                        ) : null}
                    </Fragment>
                ))}
            </div>
        );
    }
    //// MISC ////
}

////// EXPORTS //////

export default Table;
