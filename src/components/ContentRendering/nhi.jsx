import { getStaticPath } from "libs/paths";
import React, { Fragment } from "react";
import DownloadButton from "./DownloadButton";
import Portal from "./Portal";
import LatexExpression from "./LatexExpression";

import { Container } from "reactstrap";

export function makeUrlFriendly(string) {
    if (!string) {
        return string;
    }

    return string
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "-")
        .replace(/^-+|-+$/g, "");
}

////// RENDERING //////

export function renderTitle(title, level, className = "", classNameH = "", id) {
    var content = (
        <span id={id} className={className}>
            {renderText(title, true)}
        </span>
    );
    return renderH(level, content, classNameH);
}

export function renderH(level, content, className = "") {
    switch (level) {
        case 1:
            return <h1 className={className}>{content}</h1>;
        case 2:
            return <h2 className={className}>{content}</h2>;
        case 3:
            return <h3 className={className}>{content}</h3>;
        case 4:
            return <h4 className={className}>{content}</h4>;
        case 5:
            return <h5 className={className}>{content}</h5>;
        case 6:
            return <h6 className={className}>{content}</h6>;
        default:
            return <h7 className={className}>{content}</h7>;
    }
}

export function renderLink(value, extended, textAligned = true) {
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
                extended={extended}
                textAligned={textAligned}
            />
        );
    }
    //return (<span>[<a href={`/${value}`}><span className="nhi-strong">{value}</span></a>]</span>);
}

export function renderPortal(link, text, title = null) {
    return <Portal
        underlining={true}
        brackets={false}
        link={link}
        text={text}
        title={title}
    ></Portal>
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

export function renderGallery(line) {
    var words = line.split("&&");

    return (
        <div className="w100 text-center content-rendering-gallery">
            {words.map((value, index) => (
                <Fragment key={index}>{renderImage(value)}</Fragment>
            ))}
        </div>
    );
}

export function renderImage(line) {
    var words = line.split("|");

    return (
        <div>
            <img
                src={getStaticPath(words[1])}
                alt={words[0]}
                style={{
                    objectFit: "cover",
                    maxWidth: "100%",
                    height: words[3] + "px",
                }}
            />
            {words[2] != "" ? (
                <div className="comment py-1">{words[2]}</div>
            ) : null}
        </div>
    );
}

export function renderDownloadButton(line) {
    var words = line.split("|");

    return <DownloadButton link={getStaticPath(words[0])} text={words[1]} />;
}

export function getBlocks(line, regex, tag, startOffset = 0, endOffset = 0) {
    let matches = [...line.matchAll(regex)];
    var res = [];

    if (matches.length % 2 != 0) {
        console.error("There was odd number of matches", line, regex);
        return null;
    }

    for (var i = 0; i < matches.length; i += 2) {
        res.push({
            start: matches[i].index + startOffset,
            end: matches[i + 1].index + endOffset,
            tag: tag,
        });
    }

    return res;
}

export function renderLine(line) {
    let blocks = [
        ...getBlocks(line, /@@/g, "link", 0, 2),
        ...getBlocks(line, /::/g, "img", 0, 2),
        ...getBlocks(line, /%%/g, "tex", 0, 2),
        ...getBlocks(line, /\*\*/g, "bld", 0, 2),
        ...getBlocks(line, /\*\//g, "ita", 0, 2),
        ...getBlocks(line, /\*\-/g, "cmnt", 0, 2)
    ];

    var size = line.length;

    blocks.sort((a, b) => a.start - b.start);

    var normal = [0];

    for (var i = 0; i < blocks.length; i++) {
        normal.push(blocks[i].start);
        normal.push(blocks[i].end);
    }

    normal.push(size);

    for (var i = 0; i < normal.length; i += 2) {
        blocks.push({ start: normal[i], end: normal[i + 1], tag: "normal" });
    }

    blocks.sort((a, b) => a.start - b.start);

    return (
        <Fragment>
            {blocks.map((value, index) => {
                switch (value.tag) {
                    case "normal":
                        return (
                            <Fragment key={index}>
                                {line.substring(value.start, value.end)}
                            </Fragment>
                        );
                    case "link":
                        return (
                            <Fragment key={index}>
                                {renderLink(
                                    line.substring(
                                        value.start + 2,
                                        value.end - 2
                                    )
                                )}
                            </Fragment>
                        );
                    case "img":
                        return (
                            <Fragment key={index}>
                                {renderGallery(
                                    line.substring(
                                        value.start + 2,
                                        value.end - 2
                                    )
                                )}
                            </Fragment>
                        );
                    case "bld": 
                        return (
                            <Fragment key={index}>
                                <strong>{line.substring(value.start + 2, value.end - 2)} </strong>
                            </Fragment>
                        )
                    case "ita": 
                        return (
                            <Fragment key={index}>
                                <span className="italic">{line.substring(value.start + 2, value.end - 2)} </span>
                            </Fragment>
                        )
                    case "cmnt": 
                        return (
                            <Fragment key={index}>
                                <span className="comment">{line.substring(value.start + 2, value.end - 2)} </span>
                            </Fragment>
                        )
                    case "tex":
                        return (
                            <Fragment key={index}>
                                <LatexExpression
                                    inline={true}
                                    lines={[
                                        line.substring(
                                            value.start + 2,
                                            value.end - 2
                                        ),
                                    ]}
                                ></LatexExpression>
                            </Fragment>
                        );
                }
            })}
        </Fragment>
    );
}
