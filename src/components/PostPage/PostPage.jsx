////// IMPORTS //////

//// EXTERNAL ////

// React
import React, { Component } from "react";

// Reactstrap
import { Container, Row, Col } from "reactstrap";

//// INTERNAL ////
import { Animated } from "react-animated-css";

import ContentEntrance from "components/ContentRendering/ContentEntrance";
import XHub from "components/Hub/XHub.jsx";

import { getBootstrapSizeTags } from "libs/rendering";
import HashtagList from "components/HashtagList/HashtagList";

import "./PostPage.css";
import GalleryItem from "components/Gallery/GalleryItem";

import { getStaticPath } from "libs/paths";

import XLogo from "components/XLogo/XLogo";
import {useRouteData} from "react-static";

////// COMPONENT //////

export default function PostPage(props) {
    let { lg } = getBootstrapSizeTags();
    let { posts, post, sections, postImage, postid } = useRouteData();
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
                        <XHub
                            extended={false}
                            posts={posts}
                            sections={sections}
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
                        ></XHub>
                        <hr />
                        <div className="post-image-wrap">
                            <GalleryItem
                                src={postImage.src}
                                logoSrc={postImage.logoSrc}
                                logoClassName={postImage.logoClassName}
                                className="post-image"
                            ></GalleryItem>
                        </div>
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
