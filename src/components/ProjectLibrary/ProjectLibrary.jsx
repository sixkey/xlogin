////// IMPORTS //////

//// EXTERNAL ////

// React
import Gallery from "components/Gallery/Gallery";
import React, { Component, Fragment } from "react";

// Reactstrap
import { Container } from "reactstrap";

//// INTERNAL ////
import { posts, sections } from "content/posts.json";
import Hub from "components/Hub/Hub";

import { icons, absent } from "content/icons.json";
import { getStaticPath } from "libs/paths";
import { getPostPath, getSnipPath } from "libs/paths";
import { getPathMixed } from "libs/paths";
import HashtagList from "components/HashtagList/HashtagList";

import { languages } from "content/popular-hashtags.json";

import "./ProjectLibrary.css";

////// COMPONENT //////

class ProjectLibrary extends Component {
    //// LIFECYCLE ////
    //// RENDERING ////
    render() {
        return (
            <Container>
                <Hub
                    posts={posts}
                    sections={sections}
                    extended={true}
                    renderTitle={() => {
                        return <h2>Projects</h2>;
                    }}
                    searchTerm={this.props.searchTerm}
                    renderPostsSearch={this.renderPostsSearch}
                    renderPostsSection={this.renderPostsSection}
                ></Hub>
            </Container>
        );
    }

    renderPostsSearch(posts, sections, postKeys, extended, lg) {
        return (
            <Gallery
                items={postKeys}
                itemFunction={galleryItemFunction}
            ></Gallery>
        );
    }

    renderPostsSection(posts, sections, postKeys, extended, lg) {
        return (
            <Fragment>
                {Object.keys(sections).map((key, index) => (
                    <div className="my-2" key={index}>
                        <h3 className="py-2">{sections[key].title}</h3>
                        <Gallery
                            items={sections[key].posts}
                            itemFunction={galleryItemFunction}
                        ></Gallery>
                    </div>
                ))}
            </Fragment>
        );
    }
    //// MISC ////
}

export const galleryItemFunction = (item) => {
    console.log(item)
    if (absent.includes(item)) {
        return {
            src: `images/${item}.png`,
            logoSrc: null,
            link: getPathMixed(item),
            imgClassName: icons[item] ? icons[item] : "",
            titleElem: <h3 className="absent-title">{posts[item].title}</h3>,
        };
    } else {
        return {
            src: `images/${item}.png`,
            logoSrc: `images/${item}-logo.png`,
            link: getPathMixed(item),
            imgClassName: icons[item] ? icons[item] : "",
        };
    }
};

////// EXPORTS //////

export default ProjectLibrary;
