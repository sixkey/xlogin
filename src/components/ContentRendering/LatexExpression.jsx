////// IMPORTS //////

//// EXTERNAL ////

// React
import React, { Component, Fragment } from "react";

// Reactstrap
import { Container } from "reactstrap";

import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

//// INTERNAL ////

////// COMPONENT //////

class LatexExpression extends Component {
    //// LIFECYCLE ////
    //// RENDERING ////
    render() {
        if (this.props.inline) {
            return <InlineMath math={this.props.lines[0]} />;
        }

        return <BlockMath math={this.props.lines[0]} />;
    }
    //// MISC ////
}

////// EXPORTS //////

export default LatexExpression;
