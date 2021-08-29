////// IMPORTS //////

//// EXTERNAL ////

// React
import React from "react";

// Reactstrap
import { Container } from "reactstrap";

//// INTERNAL ////
import XHub from "components/Hub/XHub.jsx";
import {useRouteData} from "react-static";

////// COMPONENT //////

export default function Blog (props) {
    let { blogPosts, sections } = useRouteData();
    return (
        <Container>
            <XHub
                posts={blogPosts}
                sections={sections.blog}
                extended={true}
                renderTitle={() => {
                    return <h2>{sections.blog.title}</h2>;
                }}
                searchTerm={props.searchTerm}
            ></XHub>
        </Container>
    );
}
