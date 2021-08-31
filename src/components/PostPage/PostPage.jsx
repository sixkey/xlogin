////// IMPORTS //////

//// EXTERNAL ////

// React
import React, { Component, Fragment } from "react";

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
import {galleryItemFunction} from "../../libs/paths";

////// COMPONENT //////

export default function PostPage(props) {
    let { lg } = getBootstrapSizeTags();
    let { posts, post, icons, sections, postid } = useRouteData();
    const postImage = galleryItemFunction(icons, posts)(postid)
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
                        {postImage ? 
                            <Fragment>
                                <hr />
                                <div className="post-image-wrap">
                                    <GalleryItem
                                        logoClassName={postImage.logoClassName}
                                        imageClassName={postImage.imageClassName}
                                        src={postImage.src}
                                        logoSrc={postImage.logoSrc}
                                        link={postImage.link}
                                        titleElem={postImage.titleElem}
                                        className="post-image"
                                    ></GalleryItem>
                                </div> 
                            </Fragment>
                                : null }
                        <hr />
                        <div className="break-word pb-3">
                            <HashtagList
                                hashtags={post.hashtags}
                            ></HashtagList>
                        </div>
                    </Col>
                    <Col
                        lg={{ offset: 0, size: 7 }}
                        className={`content-column text-left ${lg ? "pb-5" : ""}`}
                    >   
                        <a name="post-title"></a>
                        <ContentEntrance posts={posts} postKey={postid} />
                    </Col>
                </Row>
            </Animated>
        </Container>
    );
}
