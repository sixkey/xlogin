import React, { Component } from "react";

import { Container } from "reactstrap";

import ContentRendering from "./ContentRendering";

class ContentEntrance extends Component {
    render() {
        let { posts, postKey } = this.props;

        return (
            <div className="post">
                <ContentRendering
                    posts={posts}
                    content={[posts[postKey]]}
                ></ContentRendering>
            </div>
        );
    }
}

export default ContentEntrance;
