////// IMPORTS //////

//// EXTERNAL ////

// React
import React, { Component, Fragment } from "react";

// Reactstrap
import { Container, Alert } from "reactstrap";

//// INTERNAL ////
import Header from "components/Header/Header.jsx";
import ProjectLibrary from "components/ProjectLibrary/ProjectLibrary.jsx";
import Contacts from 'components/Contacts/Contacts.jsx';
import { Animated } from "react-animated-css";

import "./Home.css";
import ColumnAnimator from "components/ColumnAnimator/ColumnAnimator";

////// COMPONENT //////

class Home extends Component {
    //// LIFECYCLE ////

    state = {
        loading: true,
        alert: null,
        alertVisible: false,
        goUpVisible: false,
    };

    componentDidMount() {
        this.setState({ loading: false });

        var onScroll = () => {
            if (!this.state.goUpVisible && window.scrollY > 300) {
                this.setState({ goUpVisible: true });
            } else if (this.state.goUpVisible && window.scrollY < 300) {
                this.setState({ goUpVisible: false });
            }
        };

        onScroll();

        window.addEventListener("scroll", onScroll);
    }

    //// RENDERING ////

    render() {
        let { loading, alert, alertVisible, goUpVisible } = this.state;
       
        var hashtag = null;
        if(typeof window !== 'undefined') {
            var query = new URLSearchParams(window.location.search);
            hashtag = query.has('hashtag') ? query.get('hashtag') : null;
        }

        if (loading) {
            return null;
        }

        return (
            <Fragment>

                <Animated
                    animationInDuration={300}
                    animationOutDuration={300}
                    isVisible={goUpVisible}
                    className="go-to-top-animation"
                >
                    <a href="#header">
                        <div className="go-to-top">
                            <i className="fas fa-chevron-up"></i>
                        </div>
                    </a>
                </Animated>
                <Container className="home">
                    {alert ? (
                        <Animated isVisible={alertVisible}>
                            {this.renderAlert(alert)}
                        </Animated>
                    ) : null}
                    <a name="header"></a>
                    <Header
                        links={[
                            ["projects", "#projects"],
                            //["blog", "#blog"]
                            ["contacts", "#contacts"],
                        ]}
                    ></Header>
                    <ColumnAnimator>
                        <div className="home-section">
                            <a name="projects"></a>
                            <ProjectLibrary
                                searchTerm={hashtag}
                            ></ProjectLibrary>
                        </div>
                        {/*
                        <div className="home-section">
                            <a name="blog"></a> 
                            <Blog
                                searchTerm={hashtag}
                            ></Blog>
                        </div>*/}
                        <div className="home-section">
                            <a name="contacts"></a>
                            <Contacts parent={this}/>
                        </div>
                    </ColumnAnimator>
                </Container>
            </Fragment>
        );
    }

    renderAlert(msg) {
        return (
            <Alert className="home-alert" color="primary">
                {msg}
            </Alert>
        );
    }

    //// MISC ////
}

////// EXPORTS //////

export default Home;
