import React, { Component, Fragment } from "react";
import { Tooltip } from "reactstrap";
import { Container } from "reactstrap";
import "./Portal.css";
import { getPathMixed } from "libs/paths";

class Portal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tooltipOpen: false,
        };

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {}

    toggle() {
        this.setState({ tooltipOpen: !this.state.tooltipOpen });
    }

    render() {
        let {
            link,
            text,
            title,
            extended,
            brackets = true,
            underlining = false,
            textAligned = true,
            nowrap = false,
        } = this.props;

        if (!link) {
            link = getPathMixed(text)
        }

        var id = `tooltip-${text}`;
        
        const leftBracket = brackets ? "[" : "";
        const rightBracket = brackets ? "]" : "";

        if (extended) {
            return (
                <Fragment>
                    <span>
                        <a
                            className={`a ${underlining ? "nhi-u" : ""}`}
                            href={link}
                        >
                            <span
                                className={`${
                                    textAligned
                                        ? "portal-extended-shrthlink"
                                        : "portal-semiextended"
                                }`}
                            >
                                <span className="p">{leftBracket}</span>
                                {text}
                                <span className="p">{rightBracket}</span>
                            </span>
                            <span className="p">{title}</span>
                        </a>
                    </span>
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <span>
                        {leftBracket}
                        <a
                            className={`${nowrap ? 'nowrap' : ''} a ${underlining ? "nhi-u" : ""}`}
                            href={link}
                            id={id}
                        >
                            {text}
                        </a>
                        {rightBracket}
                    </span>
                    {title ? (
                        <Tooltip
                            placement="right"
                            isOpen={this.state.tooltipOpen}
                            target={id}
                            toggle={this.toggle}
                        >
                            {title}
                        </Tooltip>
                    ) : null}
                </Fragment>
            );
        }
    }
}

export default Portal;
