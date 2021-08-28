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

const COLUMN_NUMBERS = { lg: 4, md: 3, sm: 2, xs: 2 }

function createPostsSearch(icons) {
    return (posts, sections, postKeys, extended, lg) => {
        return (
            <Gallery
                columnsNumbers={COLUMN_NUMBERS}
                items={postKeys}
                itemFunction={galleryItemFunction(icons, posts)}
            ></Gallery>
        );
    }
}

function createPostsSection(icons) { 
    return (posts, sections, postKeys, extended, lg) => {
        const keys = sections.sectionsOrder 
            ? sections.sectionsOrder 
            : Object.keys(sections.sections)
        return (
            <Fragment>
                {keys.map((key, index) => (
                    <div className="my-2" key={index}>
                        <h3 className="py-2">{sections.sections[key].title}</h3>
                        <Gallery
                            columnsNumbers={COLUMN_NUMBERS}
                            items={sections.sections[key].posts}
                            itemFunction={galleryItemFunction(icons, posts)}
                        ></Gallery>
                    </div>
                ))}
            </Fragment>
        );
    }
}
function ProjectLibrary (props) {
    let {projectPosts, sections, icons } = useRouteData();
    return (
        <Container>
            <XHub
                posts={projectPosts}
                sections={sections.projects}
                extended={true}
                renderTitle={() => {
                    return <h2>{sections.projects.title}</h2>;
                }}
                searchTerm={props.searchTerm}
                renderPostsSearch={createPostsSearch(icons, projectPosts)}
                renderPostsSection={createPostsSection(icons, projectPosts)}
            ></XHub>
        </Container>
    );
}

////// EXPORTS //////

export default ProjectLibrary;
