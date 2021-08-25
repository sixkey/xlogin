////// IMPORTS //////

//// EXTERNAL ////

// React
import React, { Component, Fragment } from "react";

// Reactstrap
import { Container, Row, Col } from "reactstrap";

//// INTERNAL ////

////// COMPONENT //////

class DownloadButton extends Component {
    //// LIFECYCLE ////
    //// RENDERING ////
    render() {
        const { link, text } = this.props;

        var filename = link.split("/");
        filename = filename[filename.length - 1];

        return (
            <div>
                <Row>
                    <Col xs="4">{text}</Col>
                    <Col xs="4" className="text-left">
                        {filename}
                    </Col>
                    <Col xs="4" className="text-right">
                        <a href={link} download>
                            download
                        </a>
                    </Col>
                </Row>
            </div>
        );
    }
    //// MISC ////
}

////// EXPORTS //////

export default DownloadButton;
