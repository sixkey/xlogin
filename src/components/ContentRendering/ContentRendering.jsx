import React, { Component, Fragment } from "react";

import { Container } from "reactstrap";

import "./ContentRendering.css";

import PropTypes from "prop-types";
import LatexExpression from "./LatexExpression";
import Table from "./Table";
import NhiContainer from "./NhiContainer";

import { renderText, renderDownloadButton } from "./nhi.jsx";

const RENDERING_FUNCTIONS = {
    latex: renderLatex,
    ol: renderOl,
    ul: renderUl,
    p: renderParagraph,
    error: renderError,
    post: renderPost,
    container: renderContainer,
    downloads: renderDownloads,
};

class ContentRendering extends Component {
    componentDidMount() {
        this.renderContent = this.renderContent.bind(this);
    }

    render() {
        let { content, level } = this.props;

        if (typeof content == "string") {
            return <Container>{content}</Container>;
        } else if (content && typeof content == "object") {
            return (
                <Container className="p-0">
                    {content.map((value, index) => (
                        <Fragment key={index}>
                            <NhiContainer
                                title={value.title}
                                defaultShow={value.show}
                                collapse={value.collaps}
                                level={level}
                            >
                                {this.renderContent(value)}
                            </NhiContainer>
                        </Fragment>
                    ))}
                </Container>
            );
        } else {
            return null;
        }
    }

    renderContent(content) {
        const { posts, level } = this.props;

        const contentFunction = RENDERING_FUNCTIONS[content.type];

        if (contentFunction) {
            return contentFunction(content, level, posts);
        } else {
            return (
                <Fragment>
                    <ContentRendering
                        level={this.props.level + 1}
                        content={content.content}
                        posts={posts}
                    ></ContentRendering>
                </Fragment>
            );
        }
    }

    errorComponent(title, message) {
        return {
            type: "error",
            message: message,
        };
    }
}

////// COMPONENT RENDERING //////

export function renderContainer(content, level, posts) {
    return (
        <Container className="p-0">
            <ContentRendering
                level={level + 1}
                content={content.content}
                posts={posts}
            ></ContentRendering>
        </Container>
    );
}

export function renderParagraph(content) {
    return (
        <Fragment>
            <div
                className="nhi-p"
                style={{
                    textAlign: content.alignment
                        ? content.alignment
                        : "justify",
                }}
            >
                {renderText(content.text)}
            </div>
        </Fragment>
    );
}

export function renderUl(content) {
    return (
        <Fragment>
            <ul className="p-0">
                {content.items.map((value, index) => (
                    <Fragment key={index}>
                        <li key={index}>{renderText(value, true)}</li>
                    </Fragment>
                ))}
            </ul>
        </Fragment>
    );
}

export function renderOl(content) {
    return (
        <Fragment>
            <ol className="p-0">
                {content.items.map((value, index) => (
                    <Fragment key={index}>
                        <li key={index}>{renderText(value, true)}</li>
                    </Fragment>
                ))}
            </ol>
        </Fragment>
    );
}

export function renderLatex(content) {
    return (
        <Fragment>
            <LatexExpression lines={content.items} />
        </Fragment>
    );
}

export function renderPost(content, level, posts) {
    var postReferenced = posts[content.post];
    if (!postReferenced) {
        postReferenced = this.errorComponent(
            "Reference error",
            `Post referenced [${content.post}] couldn't be found`
        );
    }

    return (
        <Fragment>
            <ContentRendering
                level={level + 1}
                content={[postReferenced]}
            ></ContentRendering>
        </Fragment>
    );
}

export function renderDownloads(content, level) {
    return (
        <Table>
            {content.items.map((item, index) => (
                <Fragment key={index}>{renderDownloadButton(item)}</Fragment>
            ))}
        </Table>
    );
}

export function renderError(content) {
    return (
        <Fragment>
            <p className="nhi-p ihnhi-errmsg">{renderText(content.message)}</p>
        </Fragment>
    );
}

ContentRendering.propTypes = {
    postReferencing: PropTypes.bool,
};

ContentRendering.defaultProps = {
    postReferencing: true,
    level: 1,
};

export default ContentRendering;
