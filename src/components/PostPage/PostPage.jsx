////// IMPORTS //////

//// EXTERNAL ////

// React
import React, { Component, Fragment } from "react";

// Reactstrap
import { Container, Row, Col } from "reactstrap";

//// INTERNAL ////
import { Animated } from "react-animated-css";

import { posts, sections } from "content/posts.json";
import ContentEntrance from "components/ContentRendering/ContentEntrance";
import Hub from "components/Hub/Hub";

import { getBootstrapSizeTags } from "libs/rendering";
import HashtagList from "components/HashtagList/HashtagList";

import "./PostPage.css";
import GalleryItem from "components/Gallery/GalleryItem";

import { galleryItemFunction } from "components/ProjectLibrary/ProjectLibrary";

import ErrorPage from "components/ErrorPage/ErrorPage";
import { getStaticPath } from "libs/paths";

import XLogo from "components/XLogo/XLogo";
import { getPathMixed } from "libs/paths";

////// COMPONENT //////

class PostPage extends Component {
    //// LIFECYCLE ////

    //// RENDERING ////
    render() {
        let { lg } = getBootstrapSizeTags();
        let { postid } = this.props;

        if (!Object.keys(posts).includes(postid)) {
            return <ErrorPage error="Post not found"></ErrorPage>;
        }

        const post = posts[postid];

        const postImage = galleryItemFunction(postid);

        return (
            <Container className="projects-container py-5">
                <Animated
                    animationIn="fadeIn"
                    animationOut="fadeOut"
                    isVisible={true}
                    animationInDuration={1000}
                >
                    <Row>
                        <Col
                            lg={{ offset: 0, size: 3 }}
                            id="scroll-follower-parent"
                        >
                            <Hub
                                extended={false}
                                posts={posts}
                                sections={sections}
                                keyToLink={getPathMixed}
                                renderTitle={() => {
                                    return (
                                        <a href={getStaticPath("")}>
                                            <XLogo
                                                className="m-auto"
                                                code="514391"
                                                size="12em"
                                            ></XLogo>
                                        </a>
                                    );
                                }}
                            ></Hub>
                            <hr />
                            <GalleryItem
                                imgClassName={"page-image"}
                                src={postImage.src}
                                logoSrc={postImage.logoSrc}
                                imgClassName={postImage.imgClassName}
                            ></GalleryItem>
                            <hr />
                            <div className="break-word">
                                <HashtagList
                                    hashtags={post.hashtags}
                                ></HashtagList>
                            </div>
                        </Col>
                        <Col
                            lg={{ offset: 0, size: 7 }}
                            className={`text-left ${lg ? "pb-5" : ""}`}
                        >   
                            <a name="post-title"></a>
                            <ContentEntrance posts={posts} postKey={postid} />
                        </Col>
                    </Row>
                </Animated>
            </Container>
        );
    }

    //// MISC ////
}

////// EXPORTS //////

export default PostPage;
