import React, { Component, Fragment } from "react";
import Portal from "components/ContentRendering/Portal";

export function makeUrlFriendly(string) {
    return string
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "-")
        .replace(/^-+|-+$/g, "");
}

export function renderTitle(title, level, className = "", id) {
    var content = (
        <span id={id} className={className}>
            {renderText(title, true)}
        </span>
    );
    return renderH(level, content);
}

export function renderH(level, content) {
    switch (level) {
        case 1:
            return <h1>{content}</h1>;
        case 2:
            return <h2>{content}</h2>;
        case 3:
            return <h3>{content}</h3>;
        case 4:
            return <h4>{content}</h4>;
        case 5:
            return <h5>{content}</h5>;
        case 6:
            return <h6>{content}</h6>;
        default:
            return <h7>{content}</h7>;
    }
}

export function renderLink(posts, value, extended, textAligned = true) {
    var title = value in posts ? posts[value].title : null;

    // If inner text with hyperlink
    if (value.includes("|")) {
        var words = value.split("|");
        return (
            <Portal
                underlining={true}
                brackets={false}
                link={words[1]}
                text={words[0]}
                textAligned={textAligned}
            ></Portal>
        );
        // If post ID (posts key)
    } else {
        return (
            <Portal
                text={value}
                title={title}
                extended={extended}
                textAligned={textAligned}
            />
        );
    }
    //return (<span>[<a href={`/${value}`}><span className="nhi-strong">{value}</span></a>]</span>);
}

export function renderText(text, span = false) {
    var lines = text.split("\n");

    if (span) {
        return (
            <Fragment>
                {lines.map((line, index) => (
                    <Fragment key={index}>
                        {renderLine(line)}
                        <Fragment>
                            {index < lines.length - 1 ? <br /> : null}
                        </Fragment>
                    </Fragment>
                ))}
            </Fragment>
        );
    } else {
        return (
            <Fragment>
                {lines.map((line, index) => (
                    <div
                        className={`${index < lines.length - 1 ? "mb-3" : ""}`}
                        key={index}
                    >
                        {renderLine(line)}
                    </div>
                ))}
            </Fragment>
        );
    }
}

export function renderLine(line) {
    return (
        <Fragment>
            {line.split("@@").map((value, index) => (
                <Fragment key={index}>
                    {index % 2 == 0 ? <span>{value}</span> : renderLink(value)}
                </Fragment>
            ))}
        </Fragment>
    );
}

export function getBootstrapSizeTags() {
    const srcWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
    return {
        xs: true,
        sm: srcWidth >= 576,
        md: srcWidth >= 768,
        lg: srcWidth >= 992,
        xl: srcWidth >= 1200,
    };
}
