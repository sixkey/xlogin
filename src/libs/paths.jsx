import React from 'react'

export const getStaticPath = (path) => {
    return `/${path}`;
};

export const isSnippetKey = (item) => (item.substring(0, 5) == "snip-")

export const getPathMixed = (item) => {
    if (item.substring(0, 5) == "snip-") {
        return getSnipPath(item);
    } else {
        return getPostPath(item);
    }
};

export const getHashtagPath = (item) => {
    return getStaticPath(`?hashtag=${item}`);
};

export const getPostPath = (item) => {
    return getStaticPath(`post/${item}`)
};

export const getSnipPath = (item) => {
    return getStaticPath(`snippet/${item}`)
};

export const galleryItemFunction = (icons, absent, posts) => {
    return (item) => {
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
    }
};

