////// IMPORTS //////

//// EXTERNAL ////

// React
import Gallery from "components/Gallery/Gallery";
import React, { Component, Fragment } from "react";

// Reactstrap
import { Container } from "reactstrap";

//// INTERNAL ////
import XHub from "components/Hub/XHub.jsx";
import "./ProjectLibrary.css";
import {useRouteData} from "react-static";
import {galleryItemFunction} from "../../libs/paths";


////// COMPONENT //////


function createPostsSearch(icons, absent) {
    return (posts, sections, postKeys, extended, lg) => {
        return (
            <Gallery
                items={postKeys}
                itemFunction={galleryItemFunction(icons, absent, posts)}
            ></Gallery>
        );
    }
}

function createPostsSection(icons, absent) { 
    return (posts, sections, postKeys, extended, lg) => {
        return (
            <Fragment>
                {Object.keys(sections).map((key, index) => (
                    <div className="my-2" key={index}>
                        <h3 className="py-2">{sections[key].title}</h3>
                        <Gallery
                            items={sections[key].posts}
                            itemFunction={galleryItemFunction(icons, absent, posts)}
                        ></Gallery>
                    </div>
                ))}
            </Fragment>
        );
    }
}
function ProjectLibrary (props) {
    let {posts, sections, icons, absent} = useRouteData();
    return (
        <Container>
            <XHub
                posts={posts}
                sections={sections}
                extended={true}
                renderTitle={() => {
                    return <h2>Projects</h2>;
                }}
                searchTerm={props.searchTerm}
                renderPostsSearch={createPostsSearch(icons, absent, posts)}
                renderPostsSection={createPostsSection(icons, absent, posts)}
            ></XHub>
        </Container>
    );
}

////// EXPORTS //////

export default ProjectLibrary;
