import React, { Component, Fragment } from "react";

import { Container, Row, Col, FormGroup, Input, Label } from "reactstrap";

import { renderLink, getBootstrapSizeTags } from "libs/rendering.jsx";

import { Animated } from "react-animated-css";

import "./Hub.css";
import Portal from "components/ContentRendering/Portal";

function HubDefaultListWrapper(props) {
    let {extended, children} = props;
    if (extended) {
        return (<div className="py-3 hub-extended-list">{children}</div>)
    } else {
        return (<Fragment>{children}</Fragment>)
    }
}

function HubDefaultItemWrapper(props) {
    let {extended, children} = props; 
    if (extended) {
        return (<div className="py-1">{children}</div>)
    } else {
        return (<Fragment>{children}</Fragment>)
    }
}

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
        this.hubid = Math.random()
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

    getSearchId() {
        return `search-${this.hubid}`
    }

    refreshPosts(searchTerm = null, hardAccept = false) {
        let { hashtags } = this.state;
        let { posts } = this.props;

        if (!searchTerm) {
            searchTerm = this.state.searchTerm;
        }

        var postKeys = Object.keys(posts);
        var sectionView = true;
        var seachId = this.getSearchId();

        if (
            !hardAccept &&
            (!searchTerm ||
                (typeof document !== 'undefinde' && document.getElementById(seachId)
                    ? document.getElementById(seachId).value.length < 1
                    : searchTerm.length < 1))
        ) {
            postKeys = postKeys
                .sort((a, b) => {
                    return a.localeCompare(b);
                })
        } else {
            sectionView = false;
            searchTerm = this.toOnlyLower(searchTerm);
            postKeys = postKeys.map((key) => {
                var changedTitle = this.toOnlyLower(posts[key].title);
                if (changedTitle.includes(searchTerm)) {
                    return {
                        key: key,
                        priority: 0,
                    };
                }
                // Check the section
                if (posts[key].section.includes(searchTerm)) {
                    return {
                        key: key,
                        priority: 2,
                    };
                }
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
            postKeys = postKeys
                .filter((a) => Boolean(a))
                .sort((a, b) => {
                    if (a.priority < b.priority) return -1;
                    if (a.priority > b.priority) return 1;
                    if (a.priority === b.priority) return a.key.localeCompare(b.key);
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
            <HubDefaultListWrapper extended={extended}>
                {postKeys.map((value, index) => (
                    <HubDefaultItemWrapper extended={extended} key={index}>
                         <Portal
                             text={value}
                             title={posts[value].title}
                             link={keyToLink(value)}
                             extended={extended}
                             nowrap={true}
                         ></Portal>
                    </HubDefaultItemWrapper>
                ))}
            </HubDefaultListWrapper>
        );
    }

    renderPostsSection(posts, sections, postKeys, extended, lg) {
        const { keyToLink } = this.props;
        const keys = sections.sectionsOrder 
            ? sections.sectionsOrder 
            : Object.keys(sections.sections)
        return (
            <Fragment>
                {keys.map((key, index) => (
                    <Animated
                        animationIn="fadeUp"
                        animationOut="fadeDown"
                        animationInDuration={300}
                        animationInDelay={index * 1000}
                        key={index}
                    >
                        { sections.sections[key].title != '' 
                            ? <h3>{sections.sections[key].title}</h3> 
                            : null 
                        } 
                        <HubDefaultListWrapper extended={extended}>
                            {sections.sections[key].posts.map((postKey, index) => (
                                <HubDefaultItemWrapper extended={extended} key={index}>
                                    <Portal
                                         text={postKey}
                                         title={posts[postKey].title}
                                         link={keyToLink(postKey)}
                                         extended={extended}
                                         nowrap={true}
                                    ></Portal>
                                </HubDefaultItemWrapper>
                            ))}
                        </HubDefaultListWrapper>
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
                                    id={this.getSearchId()}
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
    keyToLink: (value) => `/posts/${value}`,
};

export default Hub;
