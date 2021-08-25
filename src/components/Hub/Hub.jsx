import React, { Component, Fragment } from "react";

import { Container, Row, Col, FormGroup, Input, Label } from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";

import { renderLink, getBootstrapSizeTags } from "libs/rendering.jsx";

import { Animated } from "react-animated-css";

import "./Hub.css";
import Portal from "components/ContentRendering/Portal";

class Hub extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hashtags: [],
            postKeys: [],
            sectionView: true,
            searchTerm: props.searchTerm,
            parentSearchTerm: props.searchTerm,
        };

        this.onChange = this.onChange.bind(this);
        this.refreshPosts = this.refreshPosts.bind(this);

        this.renderPostsSection = this.renderPostsSection.bind(this);
        this.renderPostsSearch = this.renderPostsSearch.bind(this);
    }

    componentDidMount() {
        this.refreshPosts();
    }

    componentDidUpdate() {
        if (this.props.searchTerm != this.state.parentSearchTerm) {
            this.setState({
                searchTerm: this.props.searchTerm,
                parentSearchTerm: this.props.searchTerm,
            });
            this.refreshPosts(this.props.searchTerm, true);
        }
    }

    onChange(e) {
        this.setState({ searchTerm: e.target.value.toLowerCase() });
        this.refreshPosts(e.target.value.toLowerCase());
    }

    toOnlyLower(s) {
        return s.toLowerCase().replace(/[^a-z]/g, "");
    }

    refreshPosts(searchTerm = null, hardAccept = false) {
        let { hashtags } = this.state;
        let { posts } = this.props;

        if (!searchTerm) {
            searchTerm = this.state.searchTerm;
        }

        var postKeys = [];
        var sectionView = true;

        if (
            !hardAccept &&
            (!searchTerm ||
                (document.getElementById("search")
                    ? document.getElementById("search").value.length < 1
                    : searchTerm.length < 1))
        ) {
            postKeys = Object.keys(posts);
            postKeys = postKeys
                .sort((a, b) => {
                    return a < b;
                })
                .reverse();
        } else {
            sectionView = false;
            searchTerm = this.toOnlyLower(searchTerm);

            postKeys = Object.keys(posts);

            postKeys = postKeys.map((key) => {
                var changedTitle = this.toOnlyLower(posts[key].title);
                if (changedTitle.includes(searchTerm)) {
                    return {
                        key: key,
                        priority: 0,
                    };
                }
                // Check the section
                if (posts[key].section.match())
                    if (key.includes(searchTerm)) {
                        // Check the key
                        return {
                            key: key,
                            priority: 1,
                        };
                    }
                // Check the hashtags
                if (posts[key].hashtags) {
                    for (var j = 0; j < posts[key].hashtags.length; j++) {
                        if (posts[key].hashtags[j].includes(searchTerm)) {
                            return {
                                key: key,
                                priority: 2,
                            };
                        }
                    }
                }
                // Check the definitions
                if (posts[key].definitions) {
                    for (var j = 0; j < posts[key].definitions.length; j++) {
                        if (posts[key].definitions[j].includes(searchTerm)) {
                            return {
                                key: key,
                                priority: 3,
                            };
                        }
                    }
                }

                return;
            });

            postKeys = postKeys.filter((a) => {
                return a ? true : false;
            });

            postKeys = postKeys
                .sort((a, b) => {
                    if (a.priority < b.priority) return -1;
                    if (a.priority > b.priority) return 1;
                    if (a.priority === b.priority) return a.key > b.key;
                })
                .map((value) => value.key);
        }

        this.setState({ postKeys, sectionView });
    }

    renderTitle = () => {
        return <h3>Home</h3>;
    };

    renderPostsSearch(posts, sections, postKeys, extended, lg) {
        const { keyToLink } = this.props;

        return (
            <Fragment>
                {postKeys.map((value, index) => (
                    <Fragment key={index}>
                        {extended ? (
                            <div className="py-1">
                                <Portal
                                    text={value}
                                    title={posts[value].title}
                                    link={keyToLink(value)}
                                    extended={extended}
                                ></Portal>
                            </div>
                        ) : (
                            <Portal
                                text={value}
                                title={posts[value].title}
                                link={keyToLink(value)}
                                extended={extended}
                            ></Portal>
                        )}
                    </Fragment>
                ))}
            </Fragment>
        );
    }

    renderPostsSection(posts, sections, postKeys, extended, lg) {
        const { keyToLink } = this.props;
        return (
            <Fragment>
                {Object.keys(sections).map((key, index) => (
                    <Animated
                        animationIn="fadeUp"
                        animationOut="fadeDown"
                        animationInDuration={300}
                        animationInDelay={index * 1000}
                        key={index}
                    >
                        <div className="py-3">
                            <h3>{sections[key].title}</h3>
                            {sections[key].posts.map((postKey) => (
                                <div className="py-1">
                                    <Portal
                                        text={key}
                                        title={posts[key].title}
                                        link={keyToLink(key)}
                                        extended={extended}
                                    ></Portal>
                                </div>
                            ))}
                        </div>
                    </Animated>
                ))}
            </Fragment>
        );
    }

    render() {
        let {
            posts,
            sections,

            extended,
            renderPostsSearch = this.renderPostsSearch,
            renderPostsSection = this.renderPostsSection,
            renderTitle = this.renderTitle,
        } = this.props;

        let { lg } = getBootstrapSizeTags();
        let { postKeys } = this.state;

        return (
            <Animated
                animationIn="fadeIn"
                animationOut="fadeOut"
                isVisible={true}
                animationInDuration={1000}
            >
                <Container className="mb-3 px-0">
                    <Container className="pos-relative text-center px-0 py-2">
                        {renderTitle()}
                        {extended && false ? (
                            <Fragment>
                                <div className="float-hardright">
                                    <a href="/dictionary">dictionary</a>
                                </div>
                            </Fragment>
                        ) : null}
                    </Container>
                    {extended ? (
                        <Container className="text-center">
                            <FormGroup className="hub-search">
                                <Input
                                    id="search"
                                    autoComplete="off"
                                    type="text"
                                    name="search"
                                    id="search"
                                    placeholder="search"
                                    onChange={this.onChange}
                                    value={this.state.searchTerm}
                                />
                            </FormGroup>
                        </Container>
                    ) : null}
                    <Container
                        className={`${extended ? "" : "text-center"} px-0`}
                    >
                        {this.state.sectionView && extended ? (
                            <Fragment>
                                {renderPostsSection(
                                    posts,
                                    sections,
                                    postKeys,
                                    extended,
                                    lg
                                )}
                            </Fragment>
                        ) : (
                            <Fragment>
                                {renderPostsSearch(
                                    posts,
                                    sections,
                                    postKeys,
                                    extended,
                                    lg
                                )}
                            </Fragment>
                        )}
                    </Container>
                </Container>
            </Animated>
        );
    }
}

Hub.defaultProps = {
    keyToLink: (value) => `posts/${value}`,
};

export default Hub;
